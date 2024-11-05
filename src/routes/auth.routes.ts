import express from "express";

import {
  createUser,
  loginUser,
  deleteUser,
} from "../api/auth/controller/auth.controller";

const router = express.Router();

// 회원가입 라우트
router.post("/register", createUser);

// 로그인 라우트
router.post("/login", loginUser);

// 사용자 삭제 라우트(임시)
router.delete("/:email", deleteUser);

export default router;
