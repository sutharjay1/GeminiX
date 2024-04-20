import React from 'react';

const Loader = () => {
  return (
    <>
      <div className="w-[85%] h-fit flex flex-col       mx-3 gap-2 transition-opacity">
        <div className="w-full h-3 bg-gradient-to-r from-purple-900 via-purple-500 to-rose-400 rounded-full overflow-hidden">
          <div className="h-full w-full bg-zinc-900/85 animate-pulse"></div>
        </div>
        <div className=" w-[85%] h-3 bg-gradient-to-r from-rose-400 via-purple-900 to-purple-800 rounded-full overflow-hidden">
          <div className="h-full w-full bg-zinc-900/85 animate-pulse"></div>
        </div>
        <div className=" w-[65%] h-3 flex items-center justify-self-end  bg-gradient-to-r from-purple-700 via-purple-400 to-rose-400 rounded-full overflow-hidden">
          <div className="h-full w-full bg-zinc-900/85 animate-pulse justify-self-end"></div>
        </div>
      </div>
    </>
  );
};

export default Loader;
