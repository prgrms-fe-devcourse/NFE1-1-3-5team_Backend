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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePostById = exports.updatePostById = exports.getPostById = exports.createNewPost = void 0;
const postDetail_repository_1 = require("../repository/postDetail.repository");
const custom_error_1 = require("../../../common/error/custom.error");
const userProfile_service_1 = require("../../userProfile/service/userProfile.service");
const createNewPost = (postCreateDto, email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // 1. 이메일로 사용자 고유 ID 조회
        const userProfile = yield (0, userProfile_service_1.getUserObjectIdByEmail)(email);
        if (!userProfile) {
            throw new custom_error_1.NotFoundError("User profile not found");
        }
        // 2. postCreateDto의 user_id를 ObjectId로 설정
        postCreateDto.user_id = userProfile.id;
        // 3. 변경된 postCreateDto로 새로운 포스트 생성
        const newPost = yield (0, postDetail_repository_1.createPost)(postCreateDto);
        return newPost;
    }
    catch (error) {
        if (error instanceof custom_error_1.NotFoundError) {
            throw error;
        }
        console.error(`Error creating new post`, error);
        throw new custom_error_1.InternalServerError(`Error creating new post`);
    }
});
exports.createNewPost = createNewPost;
const getPostById = (postId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield (0, postDetail_repository_1.findPostById)(postId);
        return post;
    }
    catch (error) {
        if (error instanceof custom_error_1.NotFoundError) {
            throw error;
        }
        console.error(`Error fetching post by id: ${postId}`, error);
        throw new custom_error_1.InternalServerError(`Error fetching post by id: ${postId}`);
    }
});
exports.getPostById = getPostById;
const updatePostById = (postId, postUpdateDto) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedPost = yield (0, postDetail_repository_1.updatePost)(postId, postUpdateDto);
        return updatedPost;
    }
    catch (error) {
        if (error instanceof custom_error_1.NotFoundError) {
            throw error;
        }
        console.error(`Error updating post by id: ${postId}`, error);
        throw new custom_error_1.InternalServerError(`Error updating post by id: ${postId}`);
    }
});
exports.updatePostById = updatePostById;
const deletePostById = (postId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedPost = yield (0, postDetail_repository_1.deletePost)(postId);
        return deletedPost;
    }
    catch (error) {
        if (error instanceof custom_error_1.NotFoundError) {
            throw error;
        }
        console.error(`Error deleting post by id: ${postId}`, error);
        throw new custom_error_1.InternalServerError(`Error deleting post by id: ${postId}`);
    }
});
exports.deletePostById = deletePostById;
