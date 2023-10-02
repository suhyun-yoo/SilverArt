import React, {useEffect, useState} from 'react';
import {Routes, Route} from 'react-router-dom';
import './style/reset.css';

// component
import Navbar from './compontents/Navber';
// pages
import AdminPage from './pages/AdminPage';
import Main from './pages/Main';
import Notice from './pages/Notice';
import Board from './pages/Board';
import NoticeDetail from './pages/NoticeDetail';
import NoticePost from './pages/NoticePost';

function App() {
  const [active, setActive] = useState(localStorage.getItem('active') || 'Home');
  const [logIn, setLogIn] = useState(false);
  
  useEffect(() => {
    localStorage.setItem('active', active);
    const storageID = localStorage.getItem('token');
    if(storageID){
      setLogIn(true);
    } else {
      setLogIn(false);
    };
  }, [active]);

  return (
    <>
      <Navbar setActive={setActive} active={active} logIn={logIn} setLogIn={setLogIn} />
      <Routes>
        <Route path='/' element={<Main setActive={setActive}/>} />
        <Route path='/admin' element={<AdminPage setActive={setActive}/>} />
        <Route path='/notice' element={<Notice logIn={logIn}/>} />
        <Route path='/notice/post' element={<NoticePost logIn={logIn}/>} />
        <Route path='/noticeDetail/:id' element={<NoticeDetail logIn={logIn}/>} />
        <Route path='/board' element={<Board/>} />
      </Routes>
    </>
  );
};

export default App;