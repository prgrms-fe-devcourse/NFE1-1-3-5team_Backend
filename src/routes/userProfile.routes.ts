import express from "express";
import {
  getUserProfile,
  patchUserProfile,
} from "../api/userProfile/controller/userProfile.controller";

const router = express.Router();

// user profile 조회 라우트
router.get("/", getUserProfile);

// user profile 수정 라우트
router.patch("/", patchUserProfile);

export default router;
