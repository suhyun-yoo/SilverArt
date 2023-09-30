-- Users 테이블 생성
CREATE TABLE IF NOT EXISTS Users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL
);

-- 초기 데이터 삽입 (선택 사항)
INSERT INTO Users (username, password) VALUES
('admin', '0000');

-- Posts 테이블 생성
CREATE TABLE IF NOT EXISTS Posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  content TEXT,
  author_id INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (author_id) REFERENCES Users (id)
);

-- Comments 테이블 생성
CREATE TABLE IF NOT EXISTS Comments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  post_id INTEGER,
  content TEXT,
  author_id INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (post_id) REFERENCES Posts (id),
  FOREIGN KEY (author_id) REFERENCES Users (id)
);

-- 초기 데이터 삽입 (선택 사항)
INSERT INTO Posts (title, content, author_id) VALUES
('첫 번째 게시글', '게시글 내용입니다.', 1);

INSERT INTO Comments (post_id, content, author_id) VALUES
(1, '댓글 내용입니다.', 2);
