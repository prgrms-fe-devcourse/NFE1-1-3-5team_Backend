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
exports.deletePost = exports.updatePost = exports.findPostById = exports.createPost = void 0;
const client_1 = require("@prisma/client");
const custom_error_1 = require("../../../common/error/custom.error");
const prisma = new client_1.PrismaClient();
const createPost = (postCreateDto) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.post.create({
        data: Object.assign({}, postCreateDto),
    });
});
exports.createPost = createPost;
const findPostById = (postId) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield prisma.post.findUnique({
        where: { id: postId },
        include: {
            user_profile: {
                select: {
                    email: true,
                    profile_image_index: true, // 필요한 필드만 선택
                    nickname: true, // 작성자 닉네임
                },
            },
        },
    });
    if (!post) {
        console.log(`Post with id '${postId}' not found`);
        throw new custom_error_1.NotFoundError(`Post with id '${postId}' not found`);
    }
    return post;
});
exports.findPostById = findPostById;
const updatePost = (postId, postUpdateDto) => __awaiter(void 0, void 0, void 0, function* () {
    // 이 라인 통과하면 post가 존재한다는 것을 보장
    // 예외처리는 findPostById에서 처리
    yield (0, exports.findPostById)(postId);
    const updatedPost = yield prisma.post.update({
        where: { id: postId },
        data: postUpdateDto,
    });
    return updatedPost;
});
exports.updatePost = updatePost;
const deletePost = (postId) => __awaiter(void 0, void 0, void 0, function* () {
    // 이 라인 통과하면 post가 존재한다는 것을 보장
    yield (0, exports.findPostById)(postId);
    return yield prisma.post.delete({
        where: { id: postId },
    });
});
exports.deletePost = deletePost;
