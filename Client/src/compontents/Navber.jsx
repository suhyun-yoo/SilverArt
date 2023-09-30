import React from "react";
import '../style/nav.css';

export default function Navbar({setActive, active}){
  const activeMenu = (menu) => {
    setActive(menu);
  };

  return (
    <div className="nav-wrap">
      <div className="logo">
        <img src="http://www.진로체험.kr/design/default/images/logo.jpg" alt="logo" />
      </div>
      <ul className="nav">
        <li onClick={() => activeMenu('Home')} style={{fontWeight : active === 'Home' ? 700 : 400}}>Home</li>
        <li onClick={() => activeMenu('Notice')} style={{fontWeight : active === 'Notice' ? 700 : 400}}>Notice</li>
        <li onClick={() => activeMenu('Board')} style={{fontWeight : active === 'Board' ? 700 : 400}}>Board</li>
        <li onClick={() => activeMenu('Login')} style={{fontWeight : active === 'Login' ? 700 : 400}}>Login</li>
      </ul>
    </div>
  );
};