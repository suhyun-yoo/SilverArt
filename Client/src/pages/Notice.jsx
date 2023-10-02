import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../style/notice.css';

export default function Notice({logIn}){
  const [noticeData, setNoticeData] = useState();
  const [clear, setClear] = useState(false);
  const [keyword, setKeyword] = useState();
  const [filterData, setFilterData] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/notice')
      .then(res => {
        setNoticeData(res.data.notices.reverse());
      })
      .catch(error => console.error(error));
  }, []);

  const handleClick = (data) => { 
    navigate("/noticeDetail/" + data.id ,
      {state: data}    
    )
  };

  const searchNotice = () => {
    if (keyword) {
      const matchingNotices = noticeData.filter((notice) =>
        notice.title.includes(keyword)
      );

      if (matchingNotices.length > 0) {
        setFilterData(matchingNotices);
      } else {
        setFilterData('NoData');
      }
    }
  };
  const searchKeyword = (word) => {
    setKeyword(word);
    setClear(!!word);
  };
  const clearKeyword = () => {
    setKeyword("");
    setClear(false);
    setFilterData();
  };

  return (
    <div className="noticeList">
      <div className="top">
        <h2>공지사항</h2>
        <div className="inputBox">
          <input type="text" placeholder="검색어를 입력해주세요" onChange={(e) => searchKeyword(e.target.value)} value={keyword} />
          {clear && clear ? (
            <div className="clear" onClick={clearKeyword}>
              <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M55.5564 55.6693L24.4437 24.5566" stroke="#242424" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M24.4436 55.6693L55.5563 24.5566" stroke="#242424" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          ) : null}
          <div className="search" onClick={searchNotice}>
            <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M66.782 66.4336L54.3198 53.9714" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M13.5775 30.724C15.8197 22.3559 22.3559 15.8197 30.724 13.5775C39.092 11.3353 48.0206 13.7277 54.1464 19.8536C60.2723 25.9794 62.6647 34.908 60.4225 43.276C58.1802 51.6441 51.6441 58.1802 43.276 60.4225C34.908 62.6647 25.9794 60.2723 19.8536 54.1464C13.7277 48.0206 11.3353 39.092 13.5775 30.724Z" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>
      
      <div className="bottom">
        {filterData ? (
          filterData !== 'NoData' ? 
          filterData.map((notice) => {
            return (
              <div key={notice.id} className="notice" onClick={() => handleClick(notice)}>
                <p>{notice.title}</p>
                <span>{notice.created_at && notice.created_at.split(' ')[0]}</span>
              </div>
            )
          }) : (
            <div className="noData">
              <p><b>" {keyword} "</b> 에 대한 검색 결과가 존재하지 않습니다.</p>
            </div>
          )
        ) : (
          noticeData && noticeData.map((notice) => {
            return (
              <div key={notice.id} className="notice" onClick={() => handleClick(notice)}>
                <p>{notice.title}</p>
                <span>{notice.created_at && notice.created_at.split(' ')[0]}</span>
              </div>
            )
          })
        )}
      </div>

      {logIn && logIn ? (
        <div className="btnBox">
          <button onClick={() => navigate('/notice/post')}>작성하기</button>
        </div>
      ) : null}
    </div>
  )
};