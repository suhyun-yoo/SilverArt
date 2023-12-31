const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs'); 
const jwt = require('jsonwebtoken');
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
// 1. admin 계정 로그인 확인 및 토큰 발급
app.post('/admin/login', (req, res) => {
  const { id, password } = req.body;
  db.all('SELECT * FROM Users WHERE user_id = ? AND password = ?', [id, password], (err, users) => {
    if (err) {
      console.error('사용자 정보 조회 오류:', err.message);
      res.status(500).json({ error: '사용자 정보 조회 오류' });
    } else {
      if (users.length > 0) {
        const token = jwt.sign({ id: id }, 'your_secret_key', { expiresIn: '1h' });
        res.json({ login: "success", token: token });
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
app.post('/board/write', (req, res) => {
  const { title, content, author_id } = req.body;
  // 게시글을 작성하고 데이터베이스에 저장하는 코드 추가
  res.json({ message: '게시글이 작성되었습니다.' });
});

// 3-2. 게시글 수정
app.put('/board/update/:boardID', (req, res) => {
  const boardID = req.params.boardID;
  const { title, content } = req.body;
  // boardID 해당하는 게시글을 수정하는 코드 추가
  res.json({ message: '게시글이 수정되었습니다.' });
});

// 3-3. 게시글 삭제
app.delete('/board/delete/:boardID', (req, res) => {
  const boardID = req.params.boardID;
  // boardID 해당하는 게시글을 삭제하는 코드 추가
  res.json({ message: '게시글이 삭제되었습니다.' });
});

// 3-4. 게시글 조회
app.get('/board', (req, res) => {
  db.all('SELECT Posts.id, Posts.title, Posts.content, Users.user_name AS author_username, Posts.created_at FROM Posts JOIN Users ON Posts.author_username = Users.user_name', (err, rows) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: err.message }); 
    }

    // 결과를 클라이언트에게 보냄
    res.json({ posts: rows });
  });
});

// 4. 댓글 작성
// 4-1. 댓글 작성
app.post('/comments/write', (req, res) => {
  const { post_id, content, author_id } = req.body;
  // 댓글을 작성하고 데이터베이스에 저장하는 코드 추가
  res.json({ message: '댓글이 작성되었습니다.' });
});

// 4-2. 댓글 수정
app.put('/comments/update/:commentId', (req, res) => {
  const commentId = req.params.commentId;
  const { content } = req.body;
  // commentId에 해당하는 댓글을 수정하는 코드 추가
  res.json({ message: '댓글이 수정되었습니다.' });
});

// 4-3. 댓글 삭제
app.delete('/comments/delete/:commentId', (req, res) => {
  const commentId = req.params.commentId;
  // commentId에 해당하는 댓글을 삭제하는 코드 추가
  res.json({ message: '댓글이 삭제되었습니다.' });
});

// 4-4. 댓글 조회
app.get('/comments/:post_id', (req, res) => {
  const post_id = req.params.post_id;
  // post_id에 해당하는 게시글의 댓글을 조회하는 코드 추가
  res.json({ message: '댓글을 조회합니다.' });
});

// 5. 공지사항
// 5-1. 공지사항 작성
app.post('/notice/write', (req, res) => {
  const { title, content, author_id } = req.body;

  db.run(
    'INSERT INTO Notice (title, content, author_username) VALUES (?, ?, ?)',
    [title, content, author_id],
    (err) => {
      if (err) {
        console.error('공지사항 작성 오류:', err.message);
        res.status(500).json({ error: '공지사항 작성 오류' });
      } else {
        res.json({ result: 'success' });
      }
    }
  );
});

// 5-2. 공지사항 수정
app.put('/notice/update/:noticeId', (req, res) => {
  const noticeId = req.params.noticeId;
  const { title, content, author_id } = req.body;

  const sql = 'UPDATE Notice SET title = ?, content = ?, author_username = ? WHERE id = ?';
  db.run(sql, [title, content, author_id, noticeId], function(err) {
    if (err) {
      console.error('공지사항 업데이트 오류:', err.message);
      res.status(500).json({ error: '공지사항 업데이트 오류' });
    } else {
      const selectSql = 'SELECT * FROM Notice WHERE id = ?';
      db.get(selectSql, [noticeId], (err, row) => {
        if (err) {
          console.error('공지사항 조회 오류:', err.message);
          res.status(500).json({ error: '공지사항 조회 오류' });
        } else {
          res.json({ result: 'success',noticeID : noticeId, noticeData: row });
        }
      });
    }
  });
});


// 5-3. 공지사항 삭제
app.delete('/notice/delete/:noticeId', (req, res) => {
  const noticeId = req.params.noticeId;
  db.run('DELETE FROM Notice WHERE id = ?', noticeId, (err) => {
    if (err) {
      console.error('공지사항 삭제 오류:', err.message);
      res.status(500).json({ error: '공지사항 삭제 오류' });
    } else {
      res.json({ result : 'success' });
    }
  });
});

// 5-4. 공지사항 조회
app.get('/notice', (req, res) => {
  db.all('SELECT Notice.id, Notice.title, Notice.content, Users.user_name AS author_username, Notice.created_at FROM Notice JOIN Users ON Notice.author_username = Users.user_name', (err, rows) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: err.message }); 
    }

    res.json({ notices: rows });
  });
});

// Express 서버 시작
app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});

