import { Router } from "express";
import { getPostList } from "../api/postList/controller/postList.controller";

const router = Router();

// 메인 게시글 목록 조회
router.post("/", getPostList);

export default router;
