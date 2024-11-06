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
exports.getUserId = exports.getPostList = void 0;
const client_1 = require("@prisma/client");
const likePost_repository_1 = require("../../likePost/repository/likePost.repository");
const prisma = new client_1.PrismaClient();
const getPostList = (filters, page, limit, loginId, likePostIds) => __awaiter(void 0, void 0, void 0, function* () {
    const skip = (page - 1) * limit;
    // 1. 전체 게시글 수
    const totalPosts = yield prisma.post.count({
        where: filters,
    });
    // 2. 현재 페이지의 게시글 목록
    const postListData = yield prisma.post.findMany({
        where: filters,
        skip,
        take: limit,
        orderBy: { created_at: "desc" },
        include: {
            user_profile: {
                select: { nickname: true },
            },
        },
    });
    // 3. 로그인한 사용자의 관심글 목록 조회해서 데이터 재생성
    const finalLikePostIds = loginId
        ? likePostIds || (yield (0, likePost_repository_1.getUserLikePosts)(loginId))
        : [];
    const postList = postListData.map((post) => (Object.assign(Object.assign({}, post), { isLiked: loginId ? finalLikePostIds.includes(post.id) : false })));
    // const likePostIds = loginId ? await getUserLikePosts(loginId) : "";
    // const postList = postListData.map((post: postListResponseDto) => ({
    //   ...post,
    //   isLiked: loginId ? likePostIds.includes(post.id) : false,
    // }));
    // 4. 전체 페이지 수
    const totalPage = Math.ceil(totalPosts / limit);
    return { postList, totalPage };
});
exports.getPostList = getPostList;
const getUserId = (loginId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma.userProfile.findUnique({
        where: { email: loginId },
        select: { id: true },
    });
    return user ? user : { id: null };
});
exports.getUserId = getUserId;
