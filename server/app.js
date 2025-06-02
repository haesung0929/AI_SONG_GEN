// server/app.js

// ──────────────────────────────────────────────────────────
// 1) dotenv 설정: .env 파일을 프로젝트 최상단(AI_SONG_GENERATOR/.env)에서 불러옴
// ──────────────────────────────────────────────────────────
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const express = require('express');
const app = express();

// ──────────────────────────────────────────────────────────
// 2) 정적 파일 및 미들웨어 설정
// ──────────────────────────────────────────────────────────

// Body(JSON) 파싱
app.use(express.json());

// 정적 파일 서빙: 서버에서 public 폴더에 있는 index.html, script.js, style.css 등을 제공
const publicDir = path.join(__dirname, 'public');
app.use(express.static(publicDir));

// ──────────────────────────────────────────────────────────
// 3) 라우터 연결
// ──────────────────────────────────────────────────────────
const authRouter = require('./routes/auth');
const aiRouter = require('./routes/ai');
const songRouter = require('./routes/song');
const favoritesRouter = require('./routes/favorites');
const commentsRouter = require('./routes/comments');

// 인증·회원가입·프로필 조회 (auth.js)
app.use(authRouter);

// AI 가사·멜로디 생성 (ai.js)
app.use(aiRouter);

// 노래 저장·조회 (song.js)
app.use(songRouter);

// 좋아요 토글·조회 (favorites.js)
app.use(favoritesRouter);

// 댓글 조회·작성 (comments.js)
app.use(commentsRouter);

// ──────────────────────────────────────────────────────────
// 4) 정의되지 않은 엔드포인트 처리 (404)
// ──────────────────────────────────────────────────────────
app.use((req, res) => {
    res.status(404).json({ error: '존재하지 않는 엔드포인트입니다.' });
});

// ──────────────────────────────────────────────────────────
// 5) 서버 실행
// ──────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 서버 실행 중: http://localhost:${PORT}`);
});
