"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const postList_controller_1 = require("../api/postList/controller/postList.controller");
const router = (0, express_1.Router)();
// 게시글 목록 조회
router.post("/", postList_controller_1.getPostList);
exports.default = router;
