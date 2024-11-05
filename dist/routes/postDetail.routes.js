"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const postDetail_controller_1 = require("../api/postDetail/controller/postDetail.controller");
const router = express_1.default.Router();
// post detail 작성 라우트
router.post("/", postDetail_controller_1.postPostDetail);
// post detail 조회 라우트
router.get("/:id", postDetail_controller_1.getPostDetail);
// post detail 수정 라우트
router.patch("/:id", postDetail_controller_1.patchPostDetail);
// post detail 삭제 라우트
router.delete("/:id", postDetail_controller_1.deletePostDetail);
exports.default = router;
