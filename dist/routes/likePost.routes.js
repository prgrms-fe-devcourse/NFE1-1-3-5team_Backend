"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const likePost_controller_1 = require("../api/likePost/controller/likePost.controller");
const router = (0, express_1.Router)();
// 관심글 목록 조회
router.post("/", likePost_controller_1.getUserLikePostList);
// 관심글 추가
router.post("/add", likePost_controller_1.addUserLikePost);
// 관심글 삭제
router.post("/remove", likePost_controller_1.removeUserLikePost);
exports.default = router;
