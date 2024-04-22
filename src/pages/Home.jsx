import React from 'react';
import UserHeader from './../Component/UserHeader';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import FloatingCurve from '../Component/FloatingCurve';

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
            <UserHeader />
          </div>
        </div>

        <div className=" relative w-full max-w-7xl h-full  flex items-center justify-start">
          <div className="w-full min-h-[40rem] my-12  flex items-center justify-start  md:grid md:grid-cols-2      ">
            <div className="w-full h-full flex flex-col items-center justify-center  z-50">
              <div className="relative w-full h-auto flex items-center justify-start px-5 md:px-0 ">
                <img
                  src={import.meta.env.VITE_APP_LOGO}
                  className="flex items-center justify-start w-72 md:w-96 md:px-2 py-5 select-none"
                  draggable="false"
                />
              </div>
              <span className="w-[90%] md:w-[75%] text-xl md:text-2xl place-self-start px-6 md:px-2 font-semibold mb-5 mt-1">
                Supercharge your creativity and productivity
              </span>
              <span className="w-[90%] md:w-[75%] text-base place-self-start px-6 md:px-2 font-normal mb-8">
                Chat to start writing, planning, learning and more with Google
                AI
              </span>
              <div className="w-fit flex items-start justify-start place-self-start px-6 md:px-2">
                <Link to="/login">
                  {!user && (
                    <span className="text-lg text-zinc-900 rounded-full bg-[#8ab4f8]  cursor-pointer  px-5 py-3 ">
                      Sign in
                    </span>
                  )}
                </Link>
              </div>
            </div>

            <FloatingCurve />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
