import { Router } from "express";
import {
  loginUser,
  registerUser,
  deleteUser,
} from "../api/auth/controllers/userControllers";

const router = Router();

// 로그인 라우트
router.post("/login", loginUser);

// 회원가입 라우트
router.post("/register", registerUser);

// 사용자 삭제 라우트(임시)
router.delete("/:email", deleteUser);

export default router;
