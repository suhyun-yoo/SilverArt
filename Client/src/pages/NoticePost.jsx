import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router";

export default function NoticePost(){
  const navigate = useNavigate();
  const location = useLocation();

  const saveNotice = () => {
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value.replace(/\n/g, '<br/>');

    if(!location.state){
      const postData = {
        'title' : title,
        'content' : content,
        'author_id' : 'leejjin'
      };
      
      axios.post('http://localhost:5000/notice/write', postData)
        .then(res => {
          if(res.data.result === 'success'){
            navigate('/notice');
          }
        })
        .catch(error => console.error(error));
    } else {
      const putData = {
        'title' : title,
        'content' : content,
        'author_id' : 'leejjin'
      };
      
      axios.put(`http://localhost:5000/notice/update/${location.state.id}`, putData)
        .then(res => {
          if(res.data.result === 'success'){
            navigate("/noticeDetail/" + res.data.noticeID,
              {state: res.data.noticeData}    
            )
          }
        })
        .catch(error => console.error(error));
    }
  };

  return (
    <div className="noticePost">
      <p className="title">공지사항 작성하기</p>
      {location.state ? (
        <>
          <input type="text" className="notice-title" placeholder="제목을 입력하세요" id="title" defaultValue={location.state.title && location.state.title}/>
          <textarea className="notice-content"  id="content"cols="30" rows="10" placeholder="내용을 입력하세요" defaultValue={location.state.content && location.state.content.replace(/<br\/>/g, "\n")} />
        </>
      ) : (
        <>
          <input type="text" className="notice-title" placeholder="제목을 입력하세요" id="title"/>
          <textarea className="notice-content"  id="content"cols="30" rows="10" placeholder="내용을 입력하세요"/>
        </>
      )}

      <button onClick={saveNotice}>저장하기</button>
    </div>
  )
};