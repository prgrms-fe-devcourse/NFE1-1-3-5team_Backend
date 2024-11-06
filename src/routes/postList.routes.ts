import { Router } from "express";
import {
  getPostList,
  getMyPostList,
} from "../api/postList/controller/postList.controller";

const router = Router();

// 게시글 목록 조회
router.post("/", getPostList);

// 작성글 목록 조회
router.post("/my-posts", getMyPostList);

export default router;
