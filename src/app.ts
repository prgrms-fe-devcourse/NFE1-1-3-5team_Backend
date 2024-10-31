import express, { Request, Response, Router } from "express";
import cors from "cors";

import auth from "./routes/auth";

const app = express();
const PORT = process.env.PORT || 3000;

// 미들웨어 설정
// CORS 설정
app.use(cors());
// body-parser 설정
app.use(express.json());

// 사용자 라우트 설정
app.use("/api/auth", auth);

// 서버 실행
app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
