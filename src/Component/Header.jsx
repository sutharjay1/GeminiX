import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BiLogoNodejs } from 'react-icons/bi';
import { FaUser } from 'react-icons/fa';
import { MdHistory } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { IoReorderThreeOutline } from 'react-icons/io5';
import { IoClose } from 'react-icons/io5';
import { Tooltip } from 'react-tooltip';
import { useCookies } from 'react-cookie';
import {
  setUser,
  setUserPrompt,
  setUserSuggestion,
} from '../store/userSlice.js';
import UserAvatar from './UserAvatar.jsx';
import { GoHome } from 'react-icons/go';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user?.user);
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileActive, setIsProfileActive] = useState(false);

  const handleMenuBar = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleProfileClick = () => {
    setIsProfileActive(!isProfileActive);
  };

  const handleSignOut = () => {
    dispatch(setUser(null));
    dispatch(setUserSuggestion(null));
    dispatch(setUserPrompt(null));
    removeCookie('token');
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    navigate('/login');
  };

  return (
    <>
      {user && (
        <div
          className={`relative md:w-fit md:h-full py-2 md:py-9 px-4 hidden md:flex md:flex-col md fixed top-0 left-0 z-50 items-center justify-between bg-[#1e1f20] transition-all`}
        >
          <Tooltip id="tooltip" />
          <div className="w-fit flex flex-col items-start justify-start z-50 gap-6">
            <span
              className="text-3xl text-zinc-300 hover:bg-zinc-800 hover:rounded-full  p-2 cursor-pointer"
              onClick={handleMenuBar}
              data-tooltip-id="tooltip"
              data-tooltip-content="Expand Menu"
              data-tooltip-place="right"
              data-tooltip-offset="10"
            >
              <IoReorderThreeOutline />
            </span>
            <span
              className={`text-3xl flex items-center justify-center text-zinc-300 hover:bg-zinc-800 hover:rounded-full  p-2 select-none cursor-pointer`}
              data-tooltip-id="tooltip"
              data-tooltip-content="Home"
              data-tooltip-place="right"
              data-tooltip-offset="10"
              onClick={() => navigate(`/d/${user?.username}`)}
            >
              <GoHome />
            </span>
          </div>
          <div className="w-fit flex md:flex-col gap-6 items-center  justify-start">
            <span
              className="text-2xl  text-zinc-300 flex  items-center justify-between gap-2 hover:rounded-full py-1 select-none cursor-pointer"
              data-tooltip-id="tooltip"
              data-tooltip-content="History"
              data-tooltip-place="right"
              data-tooltip-offset="20"
            >
              <Link
                to={`/${user?.username}/history`}
                className="w-full flex items-center justify-center gap-2"
              >
                <MdHistory size={40} />
              </Link>
            </span>

            <span
              className=" text-zinc-300 flex items-center justify-center gap-2  hover:rounded-full cursor-pointer"
              data-tooltip-id="tooltip"
              // data-tooltip-content={`${user?.email}`}
              data-tooltip-html={`<div className='w-full flex flex-col items-center justify-center '><span className='text-zinc-800'>${user?.name}</span><br><span className='text-zinc-800'>${user?.email}</span></div>`}
              data-tooltip-place="bottom-end"
              data-tooltip-offset="20"
              onClick={handleProfileClick}
            >
              <UserAvatar />
            </span>
          </div>
          {isProfileActive && (
            <div className="absolute top-full right-0 w-full h-fit flex flex-col items-start justify-start  text-zinc-300 bg-[#2a2b2c]  z-50 mx-auto my-5 px-4 py-3 rounded-md">
              <div className="w-full h-fit flex items-center justify-center">
                <span className="w-full flex items-center justify-center py-4">
                  {user?.email}
                </span>
                <span
                  className="text-2xl hover:bg-zinc-800 hover:rounded-full p-2 cursor-pointer "
                  onClick={() => setIsProfileActive(false)}
                >
                  <IoClose />
                </span>
              </div>
              <div
                className="w-full h-fit flex items-center justify-start p-4 bg-[#2a2b2c] hover:bg-[#1e1f20] rounded-full cursor-pointer"
                onClick={handleSignOut}
              >
                <span className="text-base">Sign Out</span>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Header;
