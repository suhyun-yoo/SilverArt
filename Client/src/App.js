import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './style/reset.css';
import AdminPage from './pages/AdminPage';
import Main from './pages/Main';

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