import React, { useEffect } from 'react'
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './Pages/Login/Login';
import useUserStore from './Store/userStore';
import { useNavigate } from 'react-router-dom';
import Carousel from './Components/Carousel/Carousel';
import DialogModal from './Components/DialogModal/DialogModal';
function App() {
  const { user } = useUserStore();
  const navigate = useNavigate();
  // useEffect(() => {
  //   if (user) {
  //     navigate('/');
  //   } else {
  //     navigate('/login');
  //   }
  // }, [user, navigate]);
  return (
   <Routes>
      <Route path="/about" element={<div>About</div>} />
      <Route path="/dashboard" element={<div>Dashboard</div>} />
      <Route path='/login' element={<Login/>} />
      <Route path='*' element={<div>404</div>} />
      <Route path="/" element={<div>Home</div>} />
      <Route path="/carousel" element={<Carousel />} />
      <Route path='/modal' element={<DialogModal />} />
    </Routes>
  )
}

export default App
