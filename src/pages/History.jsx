import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IoSend } from 'react-icons/io5';
import { setUserSuggestion } from '../store/userSlice.js';
import { Tooltip } from 'react-tooltip';
import { useNavigate } from 'react-router-dom';
import UserHeader from '../Component/UserHeader.jsx';

const History = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user?.user);
  const userPrompts = useSelector((state) => state?.user?.user?.prompts);

  const newPromptArray = [...userPrompts]?.reverse();

  const handleHistoryPromptSubmit = (prompt) => {
    dispatch(setUserSuggestion(prompt));
    navigate(`/d/${user?.username}`);
  };

  return (
    <>
      <div className="w-full h-screen flex flex-col items-center justify-center px-2 py-2 mb-9 pt-24 md:pt-20 ">
        <Tooltip id="tooltip" />
        <div className="w-full pl-28">
          <UserHeader />
        </div>
        <div className="w-full max-w-5xl h-full flex flex-col items-start justify-start gap-5 overflow-x-scroll  ">
          {newPromptArray?.map((prompt, index) => {
            return (
              <>
                <div
                  key={prompt?._id}
                  className="w-full h-fit flex items-start justify-start bg-gradient-to-r from-purple-900 via-purple-500 to-rose-400 rounded-lg"
                >
                  <div
                    key={index}
                    className="h-full w-full bg-zinc-900/70 hover:animate-pulse  "
                  >
                    <div
                      key={prompt?._id}
                      className="w-full h-fit flex items-center justify-between bg-[#1e1f20] hover:bg-[#2a2b2c] rounded-lg px-5 py-3 cursor-pointer"
                    >
                      <span className="text-lg text-zinc-200 ">
                        {prompt?.prompt}
                      </span>
                      <span
                        className={`ml-2 w-fit h-full hover:bg-zinc-800 text-white p-[0.8rem] rounded-full flex items-center justify-center`}
                        onClick={() =>
                          handleHistoryPromptSubmit(prompt?.prompt)
                        }
                        data-tooltip-id="tooltip"
                        data-tooltip-content="Submit"
                        data-tooltip-place="bottom-end"
                        data-tooltip-offset="10"
                      >
                        <IoSend size={20} />
                      </span>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
          {newPromptArray?.length === 0 && (
            <div className="w-full h-full flex items-start justify-start px-3">
              <span className="text-zinc-300 text-3xl">Result not found</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default History;
