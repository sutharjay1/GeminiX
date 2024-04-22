import React from 'react';

const FloatingUI = ({ className }) => {
  return (
    <>
      <div
        className={`w-fit h-fit flex items-center justify-center opacity-75 ${className}`}
      >
        <div className="absolute top-0 -translate-x-1/2 -translate-y-[5%] md:-translate-x-[20%] md:translate-y-0  transform -rotate-90  mx-auto w-full h-full flex z-10 items-center justify-center animate-pulse ">
          <div className="w-fit h-fit  animate-float">
            <img
              src={import.meta.env.VITE_APP_LOGO}
              className="w-[40rem] h-auto select-none blur-3xl md:blur-[120px]"
              draggable="false"
            />
          </div>
        </div>
        <div className="absolute top-0 -translate-x-[45%] translate-y-[25%] md:translate-x-1/3  md:translate-y-0 transform rotate-[360deg]  mx-auto w-full h-full flex z-30 items-center justify-center animate-pulse ">
          <div className="w-fit h-fit  animate-float">
            <img
              src={import.meta.env.VITE_BACKDROP_LOGO}
              className="w-[40rem] h-auto select-none blur-3xl md:blur-[120px]"
              draggable="false"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default FloatingUI;
