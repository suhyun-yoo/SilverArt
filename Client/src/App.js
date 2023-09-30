import React, {useEffect, useState} from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';
import './style/reset.css';

// component
import Navbar from './compontents/Navber';
// pages
import AdminPage from './pages/AdminPage';
import Main from './pages/Main';
import Notice from './pages/Notice';
import Board from './pages/Board';

function App() {
  const [active, setActive] = useState('Home');
  const navigate = useNavigate();

  useEffect(() => {
    if(active === 'Home'){
      navigate('/');
    } else if(active === 'Notice'){
      navigate('/notice');
    } else if(active === 'Board'){
      navigate('/board');
    } else if (active === 'Login') {
      navigate('/admin');
    }
  }, [active, navigate]);

  return (
    <>
      <Navbar setActive={setActive} active={active} />
      <Routes>
        <Route path='/' element={<Main/>} />
        <Route path='/admin' element={<AdminPage/>} />
        <Route path='/notice' element={<Notice/>} />
        <Route path='/board' element={<Board/>} />
      </Routes>
    </>
  );
};

export default App;