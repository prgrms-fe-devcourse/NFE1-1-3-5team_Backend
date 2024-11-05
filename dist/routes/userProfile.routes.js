"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userProfile_controller_1 = require("../api/userProfile/controller/userProfile.controller");
const router = express_1.default.Router();
// user profile 조회 라우트
router.get("/", userProfile_controller_1.getUserProfile);
// user profile 수정 라우트
router.patch("/", userProfile_controller_1.patchUserProfile);
exports.default = router;
