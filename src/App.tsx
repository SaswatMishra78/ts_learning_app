import React, { useEffect } from 'react'
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './Pages/Login/Login';
import useUserStore from './Store/userStore';
import { useNavigate } from 'react-router-dom';
import Carousel from './Components/Carousel/Carousel';
import DialogModal from './Components/DialogModal/DialogModal';
import Home from './Components/homepage/homepage';
function App() {
  const { user } = useUserStore();
  const navigate = useNavigate();

  return (

    <Routes>
      <Route path="/about" element={<div>About</div>} />
      <Route path="/dashboard" element={<div>Dashboard</div>} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<div>404</div>} />
      <Route path="/home" element={<Home />} />
      <Route path="/carousel" element={<Carousel />} />
      <Route path="/modal" element={<DialogModal />} />

      <Route
        path="/"
        element={user && user.name ? <Navigate to="/home" /> : <Navigate to="/login" />}
      />
    </Routes>

  )
}

export default App
