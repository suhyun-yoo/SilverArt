import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../style/main.css';
import axios from "axios";

export default function Main({setActive}) {
  const [slideIndex, setSlideIndex] = useState(0);
  const [boardData, setBoardData] = useState();
  const [noticeData, setNoticeData] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const autoSlide = () => {
      if (slideIndex < 2) {
        setSlideIndex(slideIndex + 1);
      } else {
        setSlideIndex(0);
      }
    };
    const intervalId = setInterval(autoSlide, 7000);
      return () => {
      clearInterval(intervalId);
    };
  }, [slideIndex]);

  useEffect(() => {
    axios.get('http://localhost:5000/board')
      .then(res => {
        setBoardData(res.data.posts.reverse());
      })
      .catch(error => console.error(error));

    axios.get('http://localhost:5000/notice')
      .then(res => {
        setNoticeData(res.data.notices.reverse());
      })
      .catch(error => console.error(error));
  }, []);

  const handleClick = (data) => { 
    setActive('Notice');
    navigate("/noticeDetail/" + data.id ,
      {state: data}    
    )
  };

  const navigatePage = (locate) => {
    if(locate === 'Notice'){
      setActive('Notice');
      navigate('/notice');
    } else if(locate === 'Board'){
      setActive('Board');
      navigate('/board');
    }
  };

  return (
    <div className="main-wrap">
      {/* 1. banner */}
      <div className="banner">
        <div className="banner-slider-wrap" style={{transform : `translateX(-${33.333 * slideIndex}%`}} >
          <div className="slider">
            <div className="txtBox">
              <p>시니어를 대상으로 예술교육 아트체험을 진행합니다.</p>
              <h1>한국실버미술공예협회</h1>
            </div>
          </div>
          <div className="slider">2</div>
          <div className="slider">3</div>
        </div>
      </div>

      {/* 2. board */}
      <div className="board">
        <div className="txtBox">
          <p title="게시판 바로가기" onClick={() => setActive('Board')}> Gallery </p>
          <h2> 최근 게시글을 확인해보세요</h2>
        </div>
        <div className="board-slider-wrap">
          <div className="board-sliders">
            {boardData && boardData.slice(0, 4).map((board) => {
              const createdAt = new Date(board.created_at);
              const currentTime = new Date();
              const timeDifference = currentTime - createdAt;
              const isNew = timeDifference < 24 * 60 * 60 * 1000;

            return (
              <div className="board-slider" key={board.id}>
                {isNew && <div className="new">New</div>}
                <div className="top"></div>
                <div className="bottom">
                  <p className="title">{board.title}</p>
                  <p className="content">{board.content}</p>
                  <span className="date">
                    {board.created_at && board.created_at.split(" ")[0]}
                  </span>
                </div>
              </div>
            )})}
          </div>
        </div>
        <p className="go-detail" onClick={() => navigatePage('Board')}> 게시판 바로가기 </p>
      </div>

      {/* 3. notice */}
      <div className="notice">
        <div className="txtBox">
        <p title="공지사항 바로가기" onClick={() => setActive('Notice')}> Notice </p>
          <h2>공지사항을 확인해주세요</h2>
          <p>전체 <b>{noticeData && noticeData.length}</b>개</p>
        </div>
        <div className="notice-wrap">
          {noticeData && noticeData.slice(0,5).map((notice) => {
            return (
              <div key={notice.id} className="notice-data" onClick={() => handleClick(notice)}>
                <p>{notice.title}</p>
                <span>{notice.created_at && notice.created_at.split(' ')[0]}</span>
              </div>
            )
          })}
        </div>
        <p className="go-detail" onClick={() => navigatePage('Notice')}> 공지사항 바로가기 </p>
      </div>

      {/* 4. intoduce */}
    </div>
  )
};