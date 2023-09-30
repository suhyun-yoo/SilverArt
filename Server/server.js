const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs'); 
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());

// SQLite 데이터베이스 연결
const db = new sqlite3.Database('mydatabase.db', (err) => {
  if (err) {
    console.error('SQLite 연결 오류:', err.message);
  } else {
    console.log('SQLite 데이터베이스에 연결되었습니다.');
    // create-tables.sql 파일을 읽어와 스크립트를 실행합니다.
    const createTablesScript = fs.readFileSync('create-tables.sql', 'utf8');
    db.exec(createTablesScript, (err) => {
      if (err) {
        console.error('테이블 생성 오류:', err.message);
      } else {
        console.log('테이블이 성공적으로 생성되었습니다.');
      }
    });
  }
});

// Express 미들웨어 설정 및 라우트 등록
app.use(express.json());

// Http 통신
// 1. admin 계정 로그인 확인
app.post('/admin/login', (req, res) => {
  const { id, password } = req.body;

  db.all('SELECT * FROM Users WHERE username = ? AND password = ?', [id, password], (err, users) => {
    if (err) {
      console.error('사용자 정보 조회 오류:', err.message);
      res.status(500).json({ error: '사용자 정보 조회 오류' });
    } else {
      if (users.length > 0) {
        res.json("success");
      } else {
        res.json("fail");
      }
    }
  });
});

// 2. admin 계정 업데이트
app.post('/api/admin/updatePassword', (req, res) => {
  const { newPassword } = req.body;
  res.json({ message: '비밀번호가 업데이트되었습니다.' });
});

// 3. 게시글
// 3-1. 게시글 작성
// 3-2. 게시글 수정
// 3-3. 게시글 삭제

// 4. 댓글 작성
// 4-1. 댓글 작성
// 4-2. 댓글 수정
// 4-3. 댓글 삭제

// Express 서버 시작
app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});
