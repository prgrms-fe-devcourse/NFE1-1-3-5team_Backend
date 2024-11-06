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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePostDetail = exports.patchPostDetail = exports.getPostDetail = exports.postPostDetail = void 0;
const postDetail_service_1 = require("../service/postDetail.service");
const PostCreate_dto_1 = require("../dto/PostCreate.dto");
const PostUpdate_dto_1 = require("../dto/PostUpdate.dto");
const custom_error_1 = require("../../../common/error/custom.error");
const PostResponse_dto_1 = require("../dto/PostResponse.dto");
const userProfile_service_1 = require("../../userProfile/service/userProfile.service");
const postPostDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("postPostDetail 함수에 도달했습니다.");
    console.log("전체 req.body 확인:", req.body);
    const _a = req.body, { user_id } = _a, postData = __rest(_a, ["user_id"]);
    const email = user_id; //들어올 때는 user_id에 email이 들어있음
    console.log("분리된 email:", email); // 이 부분에서 email이 제대로 출력되는지 확인합니다.
    const postCreateDto = new PostCreate_dto_1.PostCreateDto(postData);
    try {
        const newPost = yield (0, postDetail_service_1.createNewPost)(postCreateDto, email);
        const postResponseDto = new PostResponse_dto_1.PostResponseDto(newPost);
        res.status(201).json(postResponseDto);
    }
    catch (error) {
        if (error instanceof custom_error_1.CustomError) {
            res.status(error.statusCode).json({ error: error.message });
        }
        else {
            console.error(`Error creating new post`, error);
            const internalError = new custom_error_1.InternalServerError(`Error creating new post`);
            res
                .status(internalError.statusCode)
                .json({ error: internalError.message });
        }
    }
});
exports.postPostDetail = postPostDetail;
const getPostDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: postId } = req.params; // req.query 대신 req.params 사용
    if (!postId || typeof postId !== "string") {
        const badRequestError = new custom_error_1.CustomError("Invalid post id", 400);
        res
            .status(badRequestError.statusCode)
            .json({ error: badRequestError.message });
        return;
    }
    try {
        const post = yield (0, postDetail_service_1.getPostById)(postId);
        const postResponseDto = new PostResponse_dto_1.PostResponseDto(post);
        res.status(200).json(postResponseDto);
    }
    catch (error) {
        if (error instanceof custom_error_1.CustomError) {
            res.status(error.statusCode).json({ error: error.message });
        }
        else {
            console.error(`Error fetching post by id: ${postId}`, error);
            const internalError = new custom_error_1.InternalServerError(`Error fetching post by id: ${postId}`);
            res
                .status(internalError.statusCode)
                .json({ error: internalError.message });
        }
    }
});
exports.getPostDetail = getPostDetail;
const patchPostDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("patchPostDetail 함수 호출됨");
    const { id: postId } = req.params;
    console.log("postId 내용:", postId);
    // `user_id`를 기존의 email값에서 진짜 id로 변환해서 맞춰줘야 post 동작이 정상적으로 돌아가네
    const userProfile = yield (0, userProfile_service_1.getUserObjectIdByEmail)(req.body.user_id);
    console.log("userProfile 내용:", userProfile);
    console.log("req.body 내용:", req.body);
    const userId = userProfile.id;
    console.log("userId 내용:", userId);
    const postUpdateDto = new PostUpdate_dto_1.PostUpdateDto(Object.assign(Object.assign({}, req.body), { user_id: userId }));
    console.log("postUpdateDto 내용:", postUpdateDto);
    if (!postId || typeof postId !== "string") {
        const badRequestError = new custom_error_1.CustomError("Invalid post id", 400);
        res
            .status(badRequestError.statusCode)
            .json({ error: badRequestError.message });
        return;
    }
    try {
        console.log("updatePostById 호출 직전"); // `updatePostById` 호출 직전 로그
        console.log("전송할 업데이트 데이터:", postUpdateDto); // 실제 전송되는 데이터 확인
        const updatedPost = yield (0, postDetail_service_1.updatePostById)(postId, postUpdateDto);
        console.log("updatePostById 호출 후");
        const postResponseDto = new PostResponse_dto_1.PostResponseDto(updatedPost);
        res.status(200).json(postResponseDto);
    }
    catch (error) {
        if (error instanceof custom_error_1.CustomError) {
            res.status(error.statusCode).json({ error: error.message });
        }
        else {
            console.error(`Error updating post by id: ${postId}`, error);
            const internalError = new custom_error_1.InternalServerError(`Error updating post by id: ${postId}`);
            res
                .status(internalError.statusCode)
                .json({ error: internalError.message });
        }
    }
});
exports.patchPostDetail = patchPostDetail;
const deletePostDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { postId } = req.query;
    if (!postId || typeof postId !== "string") {
        const badRequestError = new custom_error_1.CustomError("Invalid post id", 400);
        res
            .status(badRequestError.statusCode)
            .json({ error: badRequestError.message });
        return;
    }
    try {
        const deletedPost = yield (0, postDetail_service_1.deletePostById)(postId);
        const postResponseDto = new PostResponse_dto_1.PostResponseDto(deletedPost);
        res.status(200).json(postResponseDto);
    }
    catch (error) {
        if (error instanceof custom_error_1.CustomError) {
            res.status(error.statusCode).json({ error: error.message });
        }
        else {
            console.error(`Error deleting post by id: ${postId}`, error);
            const internalError = new custom_error_1.InternalServerError(`Error deleting post by id: ${postId}`);
            res
                .status(internalError.statusCode)
                .json({ error: internalError.message });
        }
    }
});
exports.deletePostDetail = deletePostDetail;
