import { Router } from "express";
import { getPostList } from "../api/mainPosts/controller/mainPosts.controller";

const router = Router();

// 메인 게시글 목록 조회
router.post("/", getPostList);

export default router;
