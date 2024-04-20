import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setUser, setUserPrompt, setUserSuggestion } from '../store/userSlice';
import { IoClose } from 'react-icons/io5';
import { FaUser } from 'react-icons/fa6';
import UserAvatar from './UserAvatar';
import { MdHistory } from 'react-icons/md';

const UserHeader = ({ className }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(['token']);

  const response = useSelector((state) => state?.user?.user?.prompts);
  const user = useSelector((state) => state?.user?.user);
  const [isProfileActive, setIsProfileActive] = useState(false);

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
      <div
        className={`absolute top-0 right-0 w-full flex items-center justify-between py-4 px-4 md:px-28 ${
          user ? 'pt-2 ' : 'pt-4'
        } ${className} md:pt-2`}
      >
        <Link to={`/d/${user?.username}`}>
          <span className="text-2xl text-zinc-300  font-semibold select-none">
            GeminiX
          </span>
        </Link>
        <div className="flex items-center justify-center gap-4">
          <span
            className={`text-2xl  text-zinc-300 ${
              user ? 'flex' : 'hidden'
            }  items-center justify-between gap-2 hover:rounded-full py-2 select-none cursor-pointer`}
            data-tooltip-id="tooltip"
            data-tooltip-content="History"
            data-tooltip-place="bottom-end"
            data-tooltip-offset="20"
          >
            <Link
              to={`/${user?.username}/history`}
              className="w-full flex items-center justify-center gap-2"
            >
              <MdHistory size={30} />
            </Link>
          </span>
          <span
            className={`text-2xl text-zinc-300  ${
              user ? 'flex' : 'hidden'
            } hover:rounded-full py-2 cursor-pointer`}
            data-tooltip-id="tooltip"
            data-tooltip-html={`<div className='w-full flex flex-col items-center justify-center '><span className='text-zinc-800'>${user?.name}</span><br><span className='text-zinc-800'>${user?.email}</span></div>`}
            data-tooltip-place="bottom-end"
            data-tooltip-offset="20"
            onClick={handleProfileClick}
          >
            <UserAvatar />
          </span>
        </div>
        {isProfileActive && (
          <div className="absolute top-full right-0 w-full md:w-96 h-fit flex flex-col items-start justify-start  text-zinc-300 bg-[#2a2b2c]  z-50 mx-auto md:mx-28 my-5 px-4 py-3 rounded-md md:rounded-3xl">
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
    </>
  );
};

export default UserHeader;
