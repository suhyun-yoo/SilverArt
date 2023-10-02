import React from "react";
import '../style/notice.css';
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router";
import axios from "axios";

export default function NoticeDetail({logIn}){
  const navigate = useNavigate();
  const location = useLocation();

  const deleteNotice = (idx) => {
    const deleteCheck = window.confirm('공지사항을 삭제하시겠습니까?');
    
    if(deleteCheck){
      axios.delete(`http://localhost:5000/notice/delete/${idx}`, idx)
      .then(res => {
        if(res.data.result === 'success'){
          navigate('/notice');
        }
      })
      .catch(error => console.error(error));
    }
  };
  const updateNotice = (data) => {
    navigate("/notice/post",
      {state: data}    
    )
  };

  return (
    <div className="noticeItem-wrap">
      {/* admin */}
      {logIn ? (
        <div className="btnBox">
          <button onClick={() => updateNotice(location.state)}>수정하기</button>
          <button onClick={() => deleteNotice(location.state.id)}>삭제하기</button>
        </div>
      ) : null}

      {/* visitor */}
      <div className="txtBox">
        <div className="info">
          <p>공지사항</p>
          <p> | </p>
          <p>{location.state.author_username}</p>
        </div>
        <h2>{location.state.title}</h2>
      </div>
      <p className="date">{location.state.created_at}</p>
      <div className="content" 
        dangerouslySetInnerHTML={{ __html: location.state.content }}>
      </div>


      <button className="show-noticeList" onClick={() => navigate('/notice')}>목록보기</button>
    </div>
  )
};