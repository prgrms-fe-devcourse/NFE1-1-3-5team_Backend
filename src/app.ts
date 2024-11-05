import express from "express";
import cors from "cors";

// 라우트 import하실 때 이름 이런식으로 작성해주세요
import authRoutes from "./routes/auth.routes";
import userProfileRoutes from "./routes/userProfile.routes";
import postListRoutes from "./routes/postList.routes";
import likePostRoutes from "./routes/likePost.routes";
import postDetailRoutes from "./routes/postDetail.routes";

const app = express();
const PORT = process.env.PORT || 3000;

// 미들웨어 설정
// CORS 설정
app.use(cors());
// body-parser 설정
app.use(express.json());

// 사용자 라우트 설정
app.use("/api/auth", authRoutes);
// 사용자 프로필 라우트 설정
app.use("/api/user-profile", userProfileRoutes);
// 게시글 목록 라우트 설정
app.use("/api/postList", postListRoutes);
// 관심글 라우트 설정
app.use("/api/like-post", likePostRoutes);
// 게시글 상세 라우트 설정
app.use("/api/post-detail", postDetailRoutes);

// 서버 실행
app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
