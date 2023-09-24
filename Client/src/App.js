import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';

import AdminPage from './compontents/AdminPage';
import Main from './compontents/Main';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/admin' element={<AdminPage/>} />
          <Route path='/' element={<Main/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;