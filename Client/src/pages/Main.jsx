import React, { useEffect, useState } from "react";
import '../style/main.css';
import axios from "axios";
// import Slider from "react-slick";

export default function Main() {
  const [slideIndex, setSlideIndex] = useState(0);
  const [boardData, setBoardData] = useState();

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
        console.log(res.data.posts);
      });
  }, []);
  

  return (
    <div className="main-wrap">
      {/* 1. banner */}
      <div className="banner">
        <div className="banner-slider-wrap" style={{transform : `translateX(-${33.333 * slideIndex}%`}} >
          <div className="slider" slide-idx={0}>
            <div className="txtBox">
              <p>시니어를 대상으로 예술교육 아트체험을 진행합니다.</p>
              <h1>한국실버미술공예협회</h1>
            </div>
          </div>
          <div className="slider" slide-idx={1}>2</div>
          <div className="slider" slide-idx={2}>3</div>
        </div>
      </div>

      {/* 2. board */}
      <div className="board">
        <div className="txtBox">
          <p>게시판</p>
          <h2>게시판을 확인해보세요</h2>
          <div className="board-slide"></div>
        </div>
      </div>

      {/* 3. notice */}

      {/* 4. intoduce */}
    </div>
  )
};