import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import '../style/login.css';

export default function LoginModal({setActive, setShowModal}) {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleIdChange = (e) => {
    setId(e.target.value); // ID 상태 업데이트
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value); // Password 상태 업데이트
  };
  const handleLogin = () => {
    axios.post('http://localhost:5000/admin/login', { id, password })
      .then(res => {
        if (res.data.login === "success") {
          alert('로그인 성공');
          setActive('Home');
          setShowModal(false);
          navigate('/');
          localStorage.setItem('token', res.data.token);
        } else {
          alert('로그인 실패');
        }
      })
      .catch(error => {
        console.error('로그인 요청 오류:', error);
        alert("로그인 실패");
      });
  };

  return (
    <div className="login-wrap">
      <div className="txtBox">
        <div className="close" onClick={() => setShowModal(false)}>
          <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M55.5564 55.6693L24.4437 24.5566" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M24.4436 55.6693L55.5563 24.5566" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div className="inputBox">
          <label htmlFor="id"> ID </label>
          <input type="text" id="id" value={id} onChange={handleIdChange} autoComplete="off" />
        </div>
        <div className="inputBox">
          <label htmlFor="pw">Password</label>
          <input type="password" id="pw" value={password} onChange={handlePasswordChange} />
        </div>
        <button onClick={handleLogin}> Login </button>
      </div>
    </div>
  );
};
