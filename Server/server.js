const express = require('express');
const cors = require('cors'); // cors 패키지를 불러옵니다.
const sqlite3 = require('sqlite3').verbose(); // SQLite 패키지를 불러옵니다.
const fs = require('fs'); // 파일 시스템 모듈을 불러옵니다.

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

// 관리자 비밀번호 수정 엔드포인트
// 서버 측 코드 (server.js)
app.get('/admin/login', (req, res) => {
  // 여기에서 모든 사용자 정보를 조회하고 클라이언트로 전송하는 로직을 추가
  // 예제로는 SQLite 데이터베이스에서 사용자 정보를 조회하는 코드를 작성합니다.
  db.all('SELECT * FROM Users', (err, users) => {
    if (err) {
      console.error('사용자 정보 조회 오류:', err.message);
      res.status(500).json({ error: '사용자 정보 조회 오류' });
    } else {
      res.json(users); // 모든 사용자 정보를 JSON 형태로 클라이언트에게 응답
    }
  });
});

app.post('/api/admin/updatePassword', (req, res) => {
  const { newPassword } = req.body;
  
  // 여기에서 newPassword를 기존 관리자 계정의 비밀번호로 업데이트하는 로직 추가

  res.json({ message: '비밀번호가 업데이트되었습니다.' });
});

// Express 서버 시작
app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});
