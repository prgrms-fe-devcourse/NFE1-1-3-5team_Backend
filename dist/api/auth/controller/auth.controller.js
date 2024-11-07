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
const auth_service_1 = require("../service/auth.service");
const custom_errorHandler_1 = require("../../../common/error/custom.errorHandler");
const bcrypt_1 = __importDefault(require("bcrypt"));
// 회원가입 기능
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, nickname } = req.body;
    try {
        const newUserProfile = yield (0, auth_service_1.createUserProfile)(email, nickname);
        yield (0, auth_service_1.createUserLogin)(newUserProfile.email, password);
        if (newUserProfile) {
            /**
             * TODO: 채팅서비스가 죽었을 경우 같이 죽는 문제 fix 필요
             */
            (0, auth_service_1.syncWithChatService)(newUserProfile.email, newUserProfile.nickname);
        }
        const token = (0, auth_service_1.generateToken)(newUserProfile.id);
        res.status(201).json({ token });
    }
    catch (error) {
        (0, custom_errorHandler_1.handleErrorResponse)(error, res, "createUser");
    }
});
exports.createUser = createUser;
// 로그인 기능
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    console.log(email, password);
    try {
        const userProfile = yield (0, auth_service_1.findUserProfileByEmail)(email);
        if (!userProfile) {
            res.status(400).json({ error: "이메일 또는 비밀번호가 잘못되었습니다." });
            return;
        }
        const userLogin = yield (0, auth_service_1.findUserLoginByEmail)(userProfile.email);
        if (!userLogin) {
            res.status(400).json({ error: "이메일 또는 비밀번호가 잘못되었습니다." });
            return;
        }
        const isPasswordValid = yield bcrypt_1.default.compare(password, userLogin.password);
        if (!isPasswordValid) {
            yield (0, auth_service_1.updateUserLoginInfo)(userProfile.email, userLogin.is_first_login, userLogin.last_logined_at, userLogin.login_fail_count + 1);
            res.status(400).json({ error: "이메일 또는 비밀번호가 잘못되었습니다." });
            return;
        }
        // 로그인 성공 시 로그인 정보 업데이트
        yield (0, auth_service_1.updateUserLoginInfo)(userProfile.email, false, new Date(), 0);
        const token = (0, auth_service_1.generateToken)(userProfile.id);
        res.status(200).json({
            token,
            is_first_login: userLogin.is_first_login,
            nickname: userProfile.nickname,
            profile_image_index: userProfile.profile_image_index,
        });
    }
    catch (error) {
        (0, custom_errorHandler_1.handleErrorResponse)(error, res, "userLogin");
    }
});
exports.loginUser = loginUser;
// 유저 삭제 기능 (회원 탈퇴)
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.params;
    console.log(email);
    try {
        yield (0, auth_service_1.deleteUserLogin)(email);
        const user = yield (0, auth_service_1.deleteUserProfile)(email);
        res.status(200).json({ message: "유저가 삭제되었습니다.", user });
    }
    catch (error) {
        (0, custom_errorHandler_1.handleErrorResponse)(error, res, "deleteUser");
    }
});
exports.deleteUser = deleteUser;
