import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MarkdownPreview from '@uiw/react-markdown-preview';
import Loader from './Loader';
import { IoSend } from 'react-icons/io5';
import axios from 'axios';
import { setUser, setUserPrompt } from '../store/userSlice.js';
import { Tooltip } from 'react-tooltip';
import Card from './Card.jsx';
import { toast, Toaster } from 'react-hot-toast';
import UserAvatar from './UserAvatar.jsx';
import { BsStars } from 'react-icons/bs';

const InputDiv = () => {
  const dispatch = useDispatch();
  const [prompt, setPrompt] = useState('');
  const [isFetching, setIsFetching] = useState(false);

  const username = useSelector((state) => state?.user?.user?.username);
  const response = useSelector((state) => state?.user?.user?.prompts);
  const userID = useSelector((state) => state?.user?.user?._id);
  const userPrompt = useSelector((state) => state?.user?.userPrompt);

  const userSuggestionPrompt = useSelector(
    (state) => state?.user?.userSuggestionPrompt
  );
  const [historyPrompt, setHistoryPrompt] = useState('');

  const handlePrompt = (e) => {
    setPrompt(e.target.value);
  };

  useEffect(() => {
    if (userSuggestionPrompt) {
      setHistoryPrompt(userSuggestionPrompt);
    }
  }, [userSuggestionPrompt]);

  const sendPrompt = async (e) => {
    e.preventDefault();
    setIsFetching(true);

    try {
      if (prompt === '') {
        toast.error('Please enter a prompt');
        setIsFetching(false);
        return;
      }

      await axios
        .post(`${import.meta.env.VITE_BACKEND_URI}/api/v1/prompt/${userID}`, {
          prompt,
        })
        .then((res) => {
          const { user, userPrompt } = res?.data;

          setIsFetching(false);
          dispatch(setUserPrompt(userPrompt));
          dispatch(setUser(user));
          setPrompt('');
        });
    } catch (error) {
      toast.error('Error sending prompt');
      setIsFetching(false);
    }
  };

  return (
    <div className="relative max-w-5xl w-full h-[calc(100vh-6rem)] flex  flex-col items-center justify-center text-zinc-300 ">
      <Tooltip id="tooltip" />
      <Toaster />

      <div className="fixed bottom-0  w-full max-w-5xl mx-auto md:w-[calc(100%-4rem)] flex items-center justify-center   p-2 py-7 md:py-8  ">
        <div
          className={`w-full flex items-center justify-center bg-[#1e1f20] hover:bg-[#2a2b2c]   border-[1px]  border-zinc-800 ${
            prompt.length > 100 ? 'rounded-xl' : 'rounded-full'
          } p-2`}
        >
          <form
            onSubmit={sendPrompt}
            className="w-full flex items-center justify-center"
          >
            {prompt.length > 100 ? (
              <textarea
                className={`flex-grow w-full  rounded-md bg-transparent px-3 md:px-6 py-2 md:py-3 text-base outline-none placeholder:text-zinc-600  h-32`}
                value={prompt || historyPrompt}
                onChange={handlePrompt}
              />
            ) : (
              <input
                className={`flex-grow w-full  rounded-md  bg-transparent px-3 md:px-6 py-2 md:py-3 text-base outline-none placeholder:text-zinc-600  h-12`}
                type="text"
                value={prompt || historyPrompt}
                onChange={handlePrompt}
                placeholder="Enter your prompt here..."
              />
            )}

            <span
              className={`ml-2 w-fit h-full hover:bg-zinc-700 text-white px-4 py-[0.8rem] rounded-full flex items-center justify-center ${
                isFetching ? 'cursor-not-allowed opacity-50' : ''
              }`}
              onClick={sendPrompt}
              data-tooltip-id="tooltip"
              data-tooltip-content="Submit"
              data-tooltip-place="top"
              data-tooltip-offset="10"
            >
              <IoSend size={20} />
            </span>
          </form>
        </div>
      </div>

      <div className="w-full h-1  flex flex-col flex-grow overflow-y-scroll space-y-11 mb-20 md:mb-16 md:mt-5 rounded-md overflow-hidden ">
        {!isFetching && userPrompt?.length === 0 && (
          <div className="w-full h-full flex flex-col items-center justify-start space-y-2">
            <div className="w-full h-fit flex flex-col items-start md:space-y-2 justify-start md:py-10 mx-auto px-4 md:px-5 pt-0">
              <span className="h-fit text-4xl md:text-5xl py-[0.375rem] font-semibold bg-gradient-to-r from-purple-900 via-purple-500 to-rose-500 selection:text-[#9e9e9e47] bg-clip-text text-transparent capitalize ">{`Hello, ${username}`}</span>
              <span className="text-4xl md:text-5xl font-semibold text-[#444746] bg-clip-text selection:text-[#8d9391]">{`How can I help you today?`}</span>
            </div>
            <div className="w-full h-fit p-5 flex items-center justify-start my-9 overflow-x-auto md:overflow-hidden">
              <Card />
            </div>
          </div>
        )}
        {userPrompt?.map((data, index) => (
          <div className="w-full flex flex-col items-start justify-start space-y-2 gap-1 mb-1 px-[0.375rem] py-6">
            <div className="w-full flex items-start justify-start gap-3">
              <UserAvatar />
              <span className="text-lg"> {data?.prompt}</span>
            </div>

            <div className="w-full flex items-start justify-start">
              <span className="p-2 ">
                <BsStars className="text-2xl md:text-3xl text-rose-500" />
              </span>

              <MarkdownPreview
                key={index}
                source={data?.geminiResponse}
                style={{
                  borderRadius: 8,
                  backgroundColor: '#131314',
                }}
                className="w-full rounded-md pt-0 px-2 py-2 md:px-2 md:py-1 overflow-x-scroll"
              />
            </div>
          </div>
        ))}
        {userPrompt?.length >= 1 && isFetching && (
          <>
            <div className="w-full flex flex-col items-start justify-start gap-3 px-[0.375rem] pb-12">
              <div className="w-full flex items-start justify-start gap-3">
                <UserAvatar />
                <span className="text-lg"> {prompt}</span>
              </div>
              <div className="w-full flex items-start justify-start">
                <span className="p-2">
                  <BsStars className="text-2xl md:text-3xl animate-ping" />
                </span>
                <Loader />
              </div>
            </div>
          </>
        )}
        {userPrompt?.length < 1 && isFetching && (
          <>
            <div className="w-full flex flex-col items-start justify-start gap-3  px-[0.375rem] pt-6">
              <div className="w-full flex items-start justify-start gap-3">
                <UserAvatar />
                <span className="text-lg"> {prompt}</span>
              </div>
              <div className="w-full flex items-start justify-start">
                <span className="p-2">
                  <BsStars className="text-2xl md:text-3xl animate-ping" />
                </span>
                <Loader />
              </div>
            </div>
          </>
        )}
        {/* {userPrompt?.length > 1 && isFetching && (
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Loader />
          </div>
        )} */}
        {!isFetching && !response && (
          <p className="text-[#444746]">No messages yet.</p>
        )}{' '}
      </div>
    </div>
  );
};

export default InputDiv;
