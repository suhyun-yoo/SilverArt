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
  const [active, setActive] = useState(localStorage.getItem('active') || 'Home');
  const [logIn, setLogIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('active', active);
  }, [active]);
  
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

  useEffect(() => {
    const storageID = localStorage.getItem('token');
    if(storageID){
      setLogIn(true);
    } else {
      setLogIn(false);
    };
  }, [logIn]);

  return (
    <>
      <Navbar setActive={setActive} active={active} logIn={logIn} setLogIn={setLogIn} />
      <Routes>
        <Route path='/' element={<Main setActive={setActive}/>} />
        <Route path='/admin' element={<AdminPage setLogIn={setLogIn}/>} />
        <Route path='/notice' element={<Notice/>} />
        <Route path='/board' element={<Board/>} />
      </Routes>
    </>
  );
};

export default App;