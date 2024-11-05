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
exports.removeUserLikePost = exports.addUserLikePost = exports.getUserLikePosts = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getUserLikePosts = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma.userProfile.findUnique({
        where: { email },
        select: { like_post: true },
    });
    return (user === null || user === void 0 ? void 0 : user.like_post) || [];
});
exports.getUserLikePosts = getUserLikePosts;
const addUserLikePost = (email, postId) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.userProfile.update({
        where: { email },
        data: {
            like_post: {
                push: postId,
            },
        },
    });
});
exports.addUserLikePost = addUserLikePost;
const removeUserLikePost = (email, updateLikePosts) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.userProfile.update({
        where: { email },
        data: {
            like_post: {
                set: updateLikePosts,
            },
        },
    });
});
exports.removeUserLikePost = removeUserLikePost;
