import React, { useRef } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebookF } from 'react-icons/fa6';
import { FaArrowRight } from 'react-icons/fa6';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../store/userSlice.js';
import { useCookies } from 'react-cookie';
import UserHeader from '../Component/UserHeader.jsx';
import FloatingCurve from '../Component/FloatingCurve.jsx';
import FloatingUI from '../Component/FloatingUI.jsx';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();

  const user = useSelector((store) => store?.user?.user);
  const username = useSelector((store) => store?.user?.user?.username);
  const [cookies, setCookie] = useCookies(['token']);

  const handleLoginUser = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    await axios
      .post(`${import.meta.env.VITE_BACKEND_URI}/api/auth/login`, {
        email,
        password,
      })
      .then((res) => {
        setCookie('token', res?.data?.token, { path: '/' });
        dispatch(setUser(res?.data?.user));
        toast.success(res?.data?.message);
        navigate(`/d/${res?.data?.user?.username}`);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
      });
  };

  const handleGoogleLogin = async () => {
    toast.error('Comming Soon...');
  };

  return (
    <>
      <div className="w-full flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24 text-zinc-300 z-40">
        <UserHeader />
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <Toaster />
          <div className="mb-2 flex justify-center">
            <img
              src={import.meta.env.VITE_APP_LOGO}
              className="w-48 md:w-52 py-5"
              draggable="false"
            />
          </div>
          <h2 className="text-center text-2xl font-bold leading-tight text-zinc-400">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-zinc-600 ">
            Don&apos;t have an account?{' '}
            <Link
              to={'/register'}
              className="font-medium text-zinc-400 transition-all duration-200 hover:underline"
            >
              Create a free account
            </Link>
          </p>
          <form
            className="mt-8 gap-4 space-y-4"
            onSubmit={handleLoginUser}
          >
            <div>
              <label
                htmlFor=""
                className="text-base font-medium text-zinc-400"
              >
                {' '}
                Email address{' '}
              </label>
              <div className="mt-2">
                <input
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="email"
                  placeholder="Email"
                  ref={emailRef}
                ></input>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor=""
                  className="text-base font-medium text-zinc-400"
                >
                  {' '}
                  Password{' '}
                </label>
                <a
                  href="#"
                  title=""
                  className="text-sm font-semibold text-zinc-500 hover:underline"
                >
                  {' '}
                  Forgot password?{' '}
                </a>
              </div>
              <div className="mt-2">
                <input
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="password"
                  placeholder="Password"
                  ref={passwordRef}
                ></input>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
              >
                Get started{' '}
                <FaArrowRight
                  className="ml-2"
                  size={16}
                />
              </button>
            </div>
          </form>
          <div className="mt-3 space-y-3">
            <button
              type="button"
              className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
              onClick={handleGoogleLogin}
            >
              <span className="mr-2 inline-block">
                <FcGoogle className="h-6 w-6" />
                {/* Add Google icon */}
              </span>
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
      <FloatingUI />
    </>
  );
};

export default Login;
