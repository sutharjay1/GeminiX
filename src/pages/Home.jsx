import React from 'react';
import UserHeader from './../Component/UserHeader';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <div className="w-full h-screen flex flex-col items-center justify-center m-0">
        <div className="w-full flex items-center justify-between px-10 md:px-20 py-4">
          <div className="w-fit ">
            <UserHeader className="top-3" />
          </div>
          <div className="w-fit py-4">
            <span className="text-lg rounded-md bg-[#2a2b2c] px-4 py-2">
              <Link to="/login">Sign in</Link>
            </span>
          </div>
        </div>

        <div className="w-full h-full  flex items-center justify-center">
          <div className="w-full min-h-[40rem] my-12   bg-green-500 grid grid-cols-1 md:grid-cols-2      ">
            <div className="w-full h-full flex flex-col items-center justify-center   bg-purple-500">
              <span>Supercharge your creativity and productivity</span>
              <span>
                Chat to start writing, planning, learning and more with Google
                AI
              </span>
            </div>
            <div className="w-full h-full flex items-center justify-center   bg-orange-500">
              <span>Gemini</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
