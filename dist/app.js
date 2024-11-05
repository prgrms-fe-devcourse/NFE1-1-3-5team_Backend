"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
// 라우트 import하실 때 이름 이런식으로 작성해주세요
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const userProfile_routes_1 = __importDefault(require("./routes/userProfile.routes"));
const postList_routes_1 = __importDefault(require("./routes/postList.routes"));
const likePost_routes_1 = __importDefault(require("./routes/likePost.routes"));
const postDetail_routes_1 = __importDefault(require("./routes/postDetail.routes"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// 미들웨어 설정
// CORS 설정
app.use((0, cors_1.default)());
// body-parser 설정
app.use(express_1.default.json());
// 사용자 라우트 설정
app.use("/api/auth", auth_routes_1.default);
// 사용자 프로필 라우트 설정
app.use("/api/user-profile", userProfile_routes_1.default);
// 게시글 목록 라우트 설정
app.use("/api/postList", postList_routes_1.default);
// 관심글 라우트 설정
app.use("/api/like-post", likePost_routes_1.default);
// 게시글 상세 라우트 설정
app.use("/api/post-detail", postDetail_routes_1.default);
// 서버 실행
app.listen(PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
