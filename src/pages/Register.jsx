import React, { useRef } from 'react';
import { FaArrowRight, FaFacebookF } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../store/userSlice.js';
import { useCookies } from 'react-cookie';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const [cookie, setCookie, removeCookie] = useCookies(['token']);
  const user = useSelector((state) => state?.user?.user);

  const handleRegisterUser = async (e) => {
    e.preventDefault();

    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    await axios({
      method: 'POST',
      url: `${import.meta.env.VITE_BACKEND_URI}/api/auth/register`,
      data: {
        name,
        email,
        password,
      },
    })
      .then((res) => {
        setCookie('token', res?.data?.token, { path: '/' });
        dispatch(setUser(res?.data?.user));
        toast.success(res?.data?.message);
        if (user) navigate(`/d/${user?.username}`);
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
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <Toaster />
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <div className="mb-2 flex justify-center">
            <img
              src="https://res.cloudinary.com/photo-manager/image/upload/v1713638148/gmfnacjt5ktarrpycp7u.svg"
              className="w-32 py-5"
              draggable="false"
            />
          </div>
          <h2 className="text-center text-2xl font-bold leading-tight text-zinc-400">
            Sign up to create account
          </h2>
          <p className="mt-2 text-center text-base text-zinc-600">
            Already have an account?{' '}
            <Link
              to={'/login'}
              className="font-medium text-zinc-400 transition-all duration-200 hover:underline"
            >
              Sign In
            </Link>
          </p>
          <form
            className="mt-8"
            onSubmit={handleRegisterUser}
          >
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="text-base font-medium text-zinc-400"
                >
                  {' '}
                  Full Name{' '}
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 text-zinc-400 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="Full Name"
                    id="name"
                    ref={nameRef}
                  ></input>
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="text-base font-medium text-zinc-400"
                >
                  {' '}
                  Email address{' '}
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 text-zinc-400 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="email"
                    placeholder="Email"
                    id="email"
                    ref={emailRef}
                  ></input>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-base font-medium text-zinc-400"
                  >
                    {' '}
                    Password{' '}
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 text-zinc-400 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="password"
                    placeholder="Password"
                    id="password"
                    ref={passwordRef}
                  ></input>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                >
                  Create Account{' '}
                  <FaArrowRight
                    className="ml-2"
                    size={16}
                  />
                </button>
              </div>
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
    </>
  );
};

export default Register;
