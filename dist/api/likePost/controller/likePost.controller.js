"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeUserLikePost = exports.addUserLikePost = exports.getUserLikePostList = void 0;
const likePostService = __importStar(require("../service/likePost.service"));
const postService = __importStar(require("../../postList/service/postList.service"));
const likePostRequest_dto_1 = require("../dto/likePostRequest.dto");
const postListRequest_dto_1 = require("../../postList/dto/postListRequest.dto");
const custom_errorHandler_1 = require("../../../common/error/custom.errorHandler");
/**
 * @description 사용자의 관심글 목록 조회
 * @param {Request} req 사용자의 아이디(email) 정보
 * @param {Response} res 사용자의 관심글 목록 반환
 * @returns {Promise<void>}
 */
const getUserLikePostList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // 1. 사용자의 관심글로 저장된 postId 조회
        const request = new likePostRequest_dto_1.likePostRequestDto(req.body);
        const postIds = yield likePostService.getUserLikePosts(request.loginId);
        // 2. 가져온 postId로 게시물 목록 조회
        const postList = yield postService.getLikePostList(new postListRequest_dto_1.postListRequestDto({
            postIds,
            loginId: request.loginId,
            page: request.page,
            limit: request.limit,
        }));
        res.status(200).json(postList);
    }
    catch (error) {
        (0, custom_errorHandler_1.handleErrorResponse)(error, res, "getUserLikePostList");
    }
});
exports.getUserLikePostList = getUserLikePostList;
/**
 * @description 사용자의 관심글 목록에 게시물 아이디 추가
 * @param {Request} req 사용자의 아이디(email) 정보, 게시물 id
 * @param {Response} res
 * @returns {Promise<void>}
 */
const addUserLikePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const request = new likePostRequest_dto_1.updateLikePostRequestDto(req.body);
        yield likePostService.addUserLikePost(request);
        res.status(200).json({ message: "Success added to liked posts" });
    }
    catch (error) {
        (0, custom_errorHandler_1.handleErrorResponse)(error, res, "addUserLikePost");
    }
});
exports.addUserLikePost = addUserLikePost;
/**
 * @description 사용자의 관심글 목록에서 게시물 아이디 삭제
 * @param {Request} req 사용자의 아이디(email) 정보, 게시물 id
 * @param {Response} res
 * @returns {Promise<void>}
 */
const removeUserLikePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const request = new likePostRequest_dto_1.updateLikePostRequestDto(req.body);
        yield likePostService.removeUserLikePost(request);
        res.status(200).json({ message: "Success removed from liked posts" });
    }
    catch (error) {
        (0, custom_errorHandler_1.handleErrorResponse)(error, res, "removeUserLikePost");
    }
});
exports.removeUserLikePost = removeUserLikePost;
