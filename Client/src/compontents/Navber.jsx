import React from "react";
import '../style/nav.css';

export default function Navbar({setActive, active, logIn, setLogIn}){
  const activeMenu = (menu) => {
    setActive(menu);
  };

  const handleLoginClick = () => {
    if (logIn) {
      localStorage.removeItem('token');
      setLogIn(false);
      activeMenu('Home');
    } else {
      activeMenu('Login');
    }
  };

  return (
    <div className="nav-wrap">
      <div className="logo" onClick={() => activeMenu('Home')}>
        <img src="http://www.진로체험.kr/design/default/images/logo.jpg" alt="logo" />
      </div>
      <ul className="nav">
        <li onClick={() => activeMenu('Home')} style={{fontWeight : active === 'Home' ? 700 : 400}}>Home</li>
        <li onClick={() => activeMenu('Notice')} style={{fontWeight : active === 'Notice' ? 700 : 400}}>Notice</li>
        <li onClick={() => activeMenu('Board')} style={{fontWeight : active === 'Board' ? 700 : 400}}>Board</li>
        <li onClick={() => handleLoginClick()} style={{fontWeight : active === 'Login' ? 700 : 400}}>{logIn ? 'Logout' : 'Login'}</li>
      </ul>
    </div>
  );
};
