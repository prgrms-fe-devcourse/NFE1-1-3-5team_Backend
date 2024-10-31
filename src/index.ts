import express, { Request, Response, Router } from "express";
import cors from "cors";
import auth from "./routes/auth";

const app = express();
const PORT = 3000;

// CORS 설정
app.use(cors());

// 미들웨어 설정
app.use(express.json());

// 기본 라우트
app.get("/", (_req: Request, res: Response) => {
  res.send("Express + TypeScript Server is running?");
});

// 사용자 라우트 설정
app.use("/api/auth", auth);

// 서버 실행
app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
