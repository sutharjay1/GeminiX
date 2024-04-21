import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserSuggestion } from '../store/userSlice.js';

const Card = () => {
  const dispatch = useDispatch();
  const userPrompts = useSelector((state) => state?.user?.user?.prompts);

  const newPromptArray = [...userPrompts]?.reverse().slice(0, 4);

  const handleClickedSuggestion = (prompt) => {
    dispatch(setUserSuggestion(prompt));
    setTimeout(() => {
      dispatch(setUserSuggestion(''));
    }, 5000);
  };

  return (
    <div className="w-full flex items-start justify-start gap-5 overflow-x-scroll">
      {newPromptArray?.map((prompt, index) => (
        <div
          key={prompt?._id}
          className="w-40 min-w-40 h-44 flex items-start justify-start bg-[#1e1f20] hover:bg-[#2a2b2c] rounded-lg px-3 py-3 cursor-pointer text-clip overflow-hidden"
          onClick={() => handleClickedSuggestion(prompt?.prompt)}
        >
          <span className="w-full h-full text-lg text-zinc-300 overflow-hidden whitespace-nowrap">
            {prompt?.prompt}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Card;
