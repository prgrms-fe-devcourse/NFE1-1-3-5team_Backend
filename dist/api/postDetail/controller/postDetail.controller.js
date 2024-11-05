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
exports.deletePostDetail = exports.patchPostDetail = exports.getPostDetail = exports.postPostDetail = void 0;
const postDetail_service_1 = require("../service/postDetail.service");
const PostCreate_dto_1 = require("../dto/PostCreate.dto");
const PostUpdate_dto_1 = require("../dto/PostUpdate.dto");
const custom_error_1 = require("../../../common/error/custom.error");
const PostResponse_dto_1 = require("../dto/PostResponse.dto");
const postPostDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const postCreateDto = new PostCreate_dto_1.PostCreateDto(req.body);
    try {
        const newPost = yield (0, postDetail_service_1.createNewPost)(postCreateDto);
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
    const { postId } = req.query;
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
    const { postId } = req.body;
    const postUpdateDto = new PostUpdate_dto_1.PostUpdateDto(req.body);
    if (!postId || typeof postId !== "string") {
        const badRequestError = new custom_error_1.CustomError("Invalid post id", 400);
        res
            .status(badRequestError.statusCode)
            .json({ error: badRequestError.message });
        return;
    }
    try {
        const updatedPost = yield (0, postDetail_service_1.updatePostById)(postId, postUpdateDto);
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
