import React, { useEffect, useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setUser } from './store/userSlice.js';
import Header from './Component/Header';
import Login from './pages/Login';
import Register from './pages/Register';
import Body from './pages/Body';
import Loader from './Component/Loader';
import History from './pages/History';
import { useCookies } from 'react-cookie';
import Home from './pages/Home.jsx';

const App = () => {
  axios.defaults.withCredentials = true;
  return (
    <BrowserRouter>
      <div className="w-full h-screen flex flex-col md:flex-row items-start justify-start">
        <Header />
        <div className="w-full h-screen flex items-center justify-center  overflow-hidden md:p-5">
          <AppRouter />
        </div>
      </div>
    </BrowserRouter>
  );
};

const AppRouter = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const user = useSelector((store) => store?.user?.user);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      const token = document.cookie;

      // if (!cookies?.token && window.location.pathname !== '/register') {
      //   navigate('/login');
      //   return;
      // }

      if (!cookies?.token) {
        return;
      }

      try {
        const res = await axios.post(
          `${import.meta.env.VITE_BACKEND_URI}/api/auth/verify`,
          {},
          {
            withCredentials: true,
          }
        );
        if (res?.data?.status) {
          dispatch(setUser(res?.data?.user));
          setCookie('token', res?.data?.token, { path: '/' });
        }
      } catch (error) {
        console.error('Error verifying authentication:', error.message);
        if (!user) navigate(error?.res?.data?.navigate);
      } finally {
        setLoading(false);
      }
    };
    verifyToken();
  }, [dispatch, cookies?.token, navigate, removeCookie]);

  return (
    <Routes>
      <Route
        path="/"
        element={<Home />}
      />
      <Route
        path="/login"
        element={<Login />}
      />
      <Route
        path="/register"
        element={<Register />}
      />
      <Route
        path={`/d/${user?.username}`}
        element={<Body />}
      />
      <Route
        path={`/${user?.username}/history`}
        element={<History />}
      />
    </Routes>
  );
};

export default App;
