import React, { useState, useEffect } from "react";
import axios from 'axios';

export default function AdminPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/admin/login')
    .then(res => {
        setUsers(res.data);
      })
      .catch(error => {
        console.error('사용자 정보 조회 오류:', error);
      });
  }, []);


  return (
    <div>
      <h1>Admin Page</h1>
      <div>
        <label htmlFor="id"> ID </label>
        <input type="text" id="id" />
        <label htmlFor="pw">Password</label>
        <input type="password" id="pw" />
      </div>

      <button> Login </button>

      {users && 
        <ul>
        {users.map(user => (
          <li key={user.id}>
            ID: {user.username}, Password: {user.password}
          </li>
        ))}
      </ul>
      }
    </div>
  )
};