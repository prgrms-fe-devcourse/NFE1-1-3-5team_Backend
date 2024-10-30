import express, { Request, Response, Router } from "express";
import authRouter from "./routes/authRoutes";

const app = express();
const PORT = 3000;

// 미들웨어 설정
app.use(express.json());

// 기본 라우트
app.get("/", (_req: Request, res: Response) => {
  res.send("Express + TypeScript Server is running?");
});

// auth 라우트 등록
app.use("/", authRouter);

// 서버 실행
app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
