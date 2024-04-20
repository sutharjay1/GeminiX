import React, { useState } from 'react';
import InputDiv from '../Component/InputDiv';
import { useDispatch, useSelector } from 'react-redux';
import { IoClose } from 'react-icons/io5';
import { Toaster } from 'react-hot-toast';
import { Tooltip } from 'react-tooltip';
import { FaUser } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import {
  setUser,
  setUserPrompt,
  setUserSuggestion,
} from '../store/userSlice.js';
import UserHeader from '../Component/UserHeader.jsx';

const Body = () => {
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
      <div className="relative w-full h-screen flex flex-col items-center justify-center ">
        <Tooltip id="tooltip" />
        <Toaster />
        <div className="w-full h-fit flex items-center justify-center pb-16 md:pb-0">
          <UserHeader />
        </div>
        <div
          className={`max-w-5xl w-full h-[calc(100vh+1rem)] flex items-center justify-center   ${
            response ? 'pt-1' : 'pt-44 md:pt-20'
          }`}
        >
          <InputDiv />
        </div>
      </div>
    </>
  );
};

export default Body;
