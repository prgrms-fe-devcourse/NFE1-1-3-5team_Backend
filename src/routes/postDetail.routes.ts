import express from "express";
import {
  deletePostDetail,
  getPostDetail,
  patchPostDetail,
  postPostDetail,
} from "../api/postDetail/controller/postDetail.controller";

const router = express.Router();

// post detail 작성 라우트
router.post("/", postPostDetail);

// post detail 조회 라우트
router.get("/:id", getPostDetail);

// post detail 수정 라우트
router.patch("/:id", patchPostDetail);

// post detail 삭제 라우트
router.delete("/:id", deletePostDetail);

export default router;
