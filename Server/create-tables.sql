-- Users 테이블 생성
CREATE TABLE IF NOT EXISTS Users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT NOT NULL UNIQUE,
  user_name TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL
);

-- Posts 테이블 생성
CREATE TABLE IF NOT EXISTS Posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  content TEXT,
  author_username TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (author_username) REFERENCES Users (user_name)
);

-- Notice 테이블 생성
CREATE TABLE IF NOT EXISTS Notice (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  content TEXT,
  author_username TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (author_username) REFERENCES Users (user_name)
);

-- Comments 테이블 생성
CREATE TABLE IF NOT EXISTS Comments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  post_id INTEGER,
  content TEXT,
  author_username TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (post_id) REFERENCES Posts (id),
  FOREIGN KEY (author_username) REFERENCES Users (user_name)
);

-- 초기 데이터 삽입 (선택 사항)
-- users
INSERT INTO Users (user_id, user_name, password) VALUES
('admin', 'leejjin', '0000');

-- posts
INSERT INTO Posts (title, content, author_username) VALUES
('첫 번째 게시글', '게시글 내용입니다.', 'leejjin');
INSERT INTO Posts (title, content, author_username) VALUES
('두 번째 게시글', '게시글 내용입니다.', 'leejjin');
INSERT INTO Posts (title, content, author_username) VALUES
('세 번째 게시글', '게시글 내용입니다.', 'leejjin');
INSERT INTO Posts (title, content, author_username) VALUES
('네 번째 게시글', '게시글 내용입니다.', 'leejjin');
INSERT INTO Posts (title, content, author_username) VALUES
('다섯 번째 게시글', '게시글 내용입니다.', 'leejjin');
INSERT INTO Posts (title, content, author_username) VALUES
('여섯 번째 게시글', '게시글 내용입니다.', 'leejjin');
INSERT INTO Posts (title, content, author_username) VALUES
('일곱 번째 게시글', '게시글 내용입니다.', 'leejjin');

-- comments
INSERT INTO Comments (post_id, content, author_username) VALUES
(1, '댓글 내용입니다.', 'leejjin');

-- notice
INSERT INTO Notice (title, content, author_username) VALUES
('첫 번째 공지', '공지 내용입니다.', 'leejjin');
INSERT INTO Notice (title, content, author_username) VALUES
('두 번째 공지', '공지 내용입니다.', 'leejjin');
INSERT INTO Notice (title, content, author_username) VALUES
('세 번째 공지', '공지 내용입니다.', 'leejjin');
INSERT INTO Notice (title, content, author_username) VALUES
('네 번째 공지', '공지 내용입니다.', 'leejjin');
INSERT INTO Notice (title, content, author_username) VALUES
('디섯 번째 공지', '공지 내용입니다.', 'leejjin');
INSERT INTO Notice (title, content, author_username) VALUES
('여섯 번째 공지', '공지 내용입니다.', 'leejjin');