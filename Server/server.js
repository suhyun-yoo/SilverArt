const express = require('express');
const sqlite3 = require('sqlite3').verbose(); // SQLite 패키지를 불러옵니다.

const app = express();
const port = process.env.PORT || 5000;

// SQLite 데이터베이스 연결
const db = new sqlite3.Database('mydatabase.db', (err) => {
  if (err) {
    console.error('SQLite 연결 오류:', err.message);
  } else {
    console.log('SQLite 데이터베이스에 연결되었습니다.');
  }
});

// Express 미들웨어 설정 및 라우트 등록
app.use(express.json());

// 예시 라우트: 모든 글을 조회하는 엔드포인트
app.get('/api/posts', (req, res) => {
  db.all('SELECT * FROM Posts', (err, rows) => {
    if (err) {
      console.error('데이터베이스 조회 오류:', err.message);
      res.status(500).json({ error: '데이터베이스 조회 오류' });
      return;
    }
    res.json(rows);
  });
});

// Express 서버 시작
app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});
