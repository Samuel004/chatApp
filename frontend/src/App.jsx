import React, { useEffect } from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from '../components/Navbar.jsx';
import Homepage from "../pages/HomePage.jsx";
import LoginPage from "../pages/LoginPage.jsx"
import SignUpPage from "../pages/SignUpPage.jsx"

import ProfilePage from "../pages/ProfilePage.jsx"
import { axiosInstance } from './lib/axios.js';
import { useAuthStore } from './store/useAuthStore.js';

const App = () => {
  const { authUser, checkAuth, ischeckingAuth, onlineUsers } = useAuthStore();
  console.log({ onlineUsers });
  useEffect(() => {
    checkAuth();
  }, []);

  console.log({ authUser });

  if (ischeckingAuth && !authUser)
    return (
      <h1 style={{ textAlign: "center", display: "grid", placeItems: "center", height: "100vh", fontSize: "25px" }}>
        Loading...
      </h1>
    );

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={authUser ? <Homepage /> : <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
      </Routes>
    </div>
  );
};

export default App;