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
exports.syncWithChatService = exports.generateToken = exports.deleteUserLogin = exports.deleteUserProfile = exports.updateUserLoginInfo = exports.createUserLogin = exports.createUserProfile = exports.findUserLoginByEmail = exports.findUserProfileByEmail = void 0;
const client_1 = require("@prisma/client");
const axios_1 = __importDefault(require("axios"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const profileIndexGenerator_1 = require("../../../util/profileIndexGenerator");
const prisma = new client_1.PrismaClient();
const findUserProfileByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma.userProfile.findUnique({
        where: { email },
    });
});
exports.findUserProfileByEmail = findUserProfileByEmail;
const findUserLoginByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma.userLogin.findUnique({
        where: { email },
    });
});
exports.findUserLoginByEmail = findUserLoginByEmail;
const createUserProfile = (email, nickname) => __awaiter(void 0, void 0, void 0, function* () {
    const profile_image_index = (0, profileIndexGenerator_1.generateRandomProfileIndex)();
    return prisma.userProfile.create({
        data: {
            email,
            nickname,
            profile_image_index,
        },
    });
});
exports.createUserProfile = createUserProfile;
const createUserLogin = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    return prisma.userLogin.create({
        data: {
            email,
            password: hashedPassword,
        },
    });
});
exports.createUserLogin = createUserLogin;
const updateUserLoginInfo = (email, isFirstLogin, lastLoginAt, loginFailCount) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma.userLogin.update({
        where: { email },
        data: {
            is_first_login: isFirstLogin,
            last_logined_at: lastLoginAt,
            login_fail_count: loginFailCount,
        },
    });
});
exports.updateUserLoginInfo = updateUserLoginInfo;
const deleteUserProfile = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma.userProfile.delete({
        where: { email },
    });
});
exports.deleteUserProfile = deleteUserProfile;
const deleteUserLogin = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma.userLogin.delete({
        where: { email },
    });
});
exports.deleteUserLogin = deleteUserLogin;
const generateToken = (userId) => {
    return jsonwebtoken_1.default.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "1h",
    });
};
exports.generateToken = generateToken;
const syncWithChatService = (user_id, user_nickname) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = {
        user_id: user_id, // user_id를 email로 설정
        user_nickname: user_nickname, // nickname 사용
    };
    //SEVER URL은 임시
    // /register/nickname API에 POST 요청
    yield axios_1.default.post("https://jwjwjw.store:5172/register/nickname", userData);
});
exports.syncWithChatService = syncWithChatService;
