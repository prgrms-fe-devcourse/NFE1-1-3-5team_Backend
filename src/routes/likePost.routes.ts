import { Router } from "express";
import {
  getUserLikePostList,
  addUserLikePost,
  removeUserLikePost,
} from "../api/likePost/controller/likePost.controller";

const router = Router();

// 관심글 목록 조회
router.post("/", getUserLikePostList);

// 관심글 추가
router.post("/add", addUserLikePost);

// 관심글 삭제
router.post("/remove", removeUserLikePost);

export default router;
