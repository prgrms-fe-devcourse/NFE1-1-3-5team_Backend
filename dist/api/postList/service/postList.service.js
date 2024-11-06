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
exports.getLikePostList = exports.getMyPostList = exports.getPostList = void 0;
const postRepository = __importStar(require("../repository/postList.repository"));
const getPostList = (filters) => __awaiter(void 0, void 0, void 0, function* () {
    const queryFilters = {};
    // 검색어 있는 경우
    if (filters.searchTerm) {
        queryFilters.OR = [
            { title: { contains: filters.searchTerm, mode: "insensitive" } },
            { content: { contains: filters.searchTerm, mode: "insensitive" } },
        ];
    }
    // 필터링 조건이 있는 경우 && 전체 조회가 아닌 경우
    if (filters.postType && filters.postType !== "ALL")
        queryFilters.type = filters.postType;
    if (filters.position && filters.position !== "ALL")
        queryFilters.position = { hasSome: [filters.position] };
    if (filters.participationMethod && filters.participationMethod !== "ALL")
        queryFilters.participation_method = filters.participationMethod;
    if (filters.interests && filters.interests.length > 0) {
        queryFilters.interests = { hasSome: filters.interests };
    }
    // 로그인했을 경우
    const loginId = filters.loginId ? filters.loginId : null;
    // 페이지네이션
    const page = filters.page;
    const limit = filters.limit;
    const { postList, totalPage } = yield postRepository.getPostList(queryFilters, page, limit, loginId);
    return { postList, totalPage };
});
exports.getPostList = getPostList;
const getMyPostList = (filters) => __awaiter(void 0, void 0, void 0, function* () {
    const queryFilters = {};
    // 사용자 이메일로 사용자 id 고유값 가지고 옴
    if (filters.loginId) {
        const userProfileId = yield postRepository.getUserId(filters.loginId);
        if (userProfileId) {
            queryFilters.user_id = userProfileId.id;
        }
        else {
            throw new Error("User not found");
        }
    }
    const loginId = filters.loginId ? filters.loginId : null;
    // 페이지네이션
    const page = filters.page;
    const limit = filters.limit;
    const { postList, totalPage } = yield postRepository.getPostList(queryFilters, page, limit, loginId);
    return { postList, totalPage };
});
exports.getMyPostList = getMyPostList;
const getLikePostList = (filters) => __awaiter(void 0, void 0, void 0, function* () {
    const queryFilters = {};
    if (filters.postIds && filters.postIds.length > 0) {
        queryFilters.id = { in: filters.postIds };
    }
    // 페이지네이션
    const page = filters.page;
    const limit = filters.limit;
    const { postList, totalPage } = yield postRepository.getPostList(queryFilters, page, limit, filters.loginId, filters.postIds);
    return { postList, totalPage };
});
exports.getLikePostList = getLikePostList;
