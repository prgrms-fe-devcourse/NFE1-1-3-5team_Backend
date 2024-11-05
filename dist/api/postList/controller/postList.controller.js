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
exports.getPostList = void 0;
const postService = __importStar(require("../service/postList.service"));
const postListRequest_dto_1 = require("../dto/postListRequest.dto");
const custom_errorHandler_1 = require("../../../common/error/custom.errorHandler");
/**
 * @description 주어진 필터링 조건을 기반으로 게시글 목록 조회
 * @param {Request} req 필터링 조건을 포함
 * @param {Response} res 조회된 게시글 목록 반환
 * @returns {Promise<void>}
 */
const getPostList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filters = new postListRequest_dto_1.postListRequestDto(req.body);
        const postList = yield postService.getPostList(filters);
        res.status(200).json(postList);
    }
    catch (error) {
        (0, custom_errorHandler_1.handleErrorResponse)(error, res, "getPostList");
    }
});
exports.getPostList = getPostList;
