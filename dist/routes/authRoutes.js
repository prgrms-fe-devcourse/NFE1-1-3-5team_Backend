"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authControllers_1 = require("../api/auth/controllers/authControllers");
const router = express_1.default.Router();
// 회원가입 라우트
router.post("/register", authControllers_1.createUser);
// 로그인 라우트
router.post("/login", authControllers_1.loginUser);
// 사용자 삭제 라우트(임시)
router.delete("/:email", authControllers_1.deleteUser);
exports.default = router;
