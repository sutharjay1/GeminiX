import React from 'react';
import UserHeader from './../Component/UserHeader';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Home = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user?.user);

  const handleNavigateUser = () => {
    navigate('/login');
  };

  return (
    <>
      <div className="w-full h-screen flex flex-col items-center justify-center m-0 bg-[#131314]">
        <div className="w-full flex items-center justify-between px-10 md:px-20 py-4 ">
          <div className="w-fit ">
            <UserHeader className="top-3" />
          </div>
          <div className="w-fit py-4 z-40 md:mt-0">
            <Link to="/login">
              {!user && (
                <span className="text-lg rounded-md text-zinc-900  bg-[#8ab4f8] b px-4 py-2 ">
                  Sign in
                </span>
              )}
            </Link>
          </div>
        </div>

        <div className="w-full max-w-7xl h-full  flex items-center justify-center">
          <div className="w-full min-h-[40rem] my-12    grid grid-cols-1 md:grid-cols-2      ">
            <div className="w-full h-full flex flex-col items-center justify-center   ">
              <div className="relative w-full h-auto flex items-center justify-start px-5 md:px-0 ">
                <img
                  src={import.meta.env.VITE_APP_LOGO}
                  className="absolute bottom-8 sm:bottom-9 md:bottom-11 -left-11 sm:-left-[20.5rem] md:-left-[19rem] right-0 sm:right-0 md:right-0 mx-auto w-16 md:w-14  py-5 select-none"
                  draggable="false"
                />
                <span className="h-fit text-6xl md:text-7xl py-1 font-bold bg-gradient-to-r from-purple-900 via-purple-500 to-rose-500 selection:text-[#9e9e9e47] bg-clip-text text-transparent capitalize tracking-wide">
                  GeminiX
                </span>
              </div>
              <span className="w-[75%] text-xl md:text-2xl place-self-start px-6 md:px-2 font-semibold mb-5 mt-1">
                Supercharge your creativity and productivity
              </span>
              <span className="w-[75%] text-base place-self-start px-6 md:px-2 font-normal mb-8">
                Chat to start writing, planning, learning and more with Google
                AI
              </span>
              <div className="w-fit flex items-start justify-start place-self-start">
                <Link to="/login">
                  {!user && (
                    <span className="text-lg text-zinc-900 rounded-full bg-[#8ab4f8] px-5 py-3 ">
                      Sign in
                    </span>
                  )}
                </Link>
              </div>
            </div>
            <div className="w-full h-full flex items-center justify-center ">
              <img
                src={import.meta.env.VITE_APP_LOGO}
                className="w-96 h-96 select-none"
                draggable="false"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
