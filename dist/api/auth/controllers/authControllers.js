"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.loginUser = exports.createUser = void 0;
const authService_1 = require("../service/authService");
const bcrypt_1 = __importDefault(require("bcrypt"));
// 회원가입 기능
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, nickname } = req.body;
    try {
        const newUserProfile = yield (0, authService_1.createUserProfile)(email, nickname);
        yield (0, authService_1.createUserLogin)(newUserProfile.email, password);
        const token = (0, authService_1.generateToken)(newUserProfile.id);
        res.status(201).json({ token });
    }
    catch (error) {
        res.status(500).json({ error: "회원가입 중 오류가 발생했습니다." });
    }
});
exports.createUser = createUser;
// 로그인 기능
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const userProfile = yield (0, authService_1.findUserProfileByEmail)(email);
        if (!userProfile) {
            res.status(400).json({ error: "이메일 또는 비밀번호가 잘못되었습니다." });
            return;
        }
        const userLogin = yield (0, authService_1.findUserLoginByEmail)(userProfile.email);
        if (!userLogin) {
            res.status(400).json({ error: "이메일 또는 비밀번호가 잘못되었습니다." });
            return;
        }
        const isPasswordValid = yield bcrypt_1.default.compare(password, userLogin.password);
        if (!isPasswordValid) {
            yield (0, authService_1.updateUserLoginInfo)(userProfile.email, userLogin.is_first_login, userLogin.last_logined_at, userLogin.login_fail_count + 1);
            res.status(400).json({ error: "이메일 또는 비밀번호가 잘못되었습니다." });
            return;
        }
        // 로그인 성공 시 로그인 정보 업데이트
        yield (0, authService_1.updateUserLoginInfo)(userProfile.email, false, new Date(), 0);
        const token = (0, authService_1.generateToken)(userProfile.id);
        res.status(200).json({ token });
    }
    catch (error) {
        res.status(500).json({ error: "서버 오류가 발생했습니다." });
    }
});
exports.loginUser = loginUser;
// 유저 삭제 기능 (회원 탈퇴)
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.params;
    try {
        const user = yield (0, authService_1.deleteUserProfile)(email);
        yield (0, authService_1.deleteUserLogin)(email);
        res.status(200).json({ message: "유저가 삭제되었습니다.", user });
    }
    catch (error) {
        res.status(500).json({ error: "유저 삭제 중 오류가 발생했습니다." });
    }
});
exports.deleteUser = deleteUser;
