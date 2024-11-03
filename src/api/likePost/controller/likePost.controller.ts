import { Request, Response } from "express";
import * as likePostService from "../service/likePost.service";
import * as postService from "../../postList/service/postList.service";
import {
  likePostRequestDto,
  updateLikePostRequestDto,
} from "../dto/likePostRequest.dto";
import { postListRequestDto } from "../../postList/dto/postListRequest.dto";
import { handleErrorResponse } from "../../../common/error/custom.errorHandler";

/**
 * @description 사용자의 관심글 목록 조회
 * @param {Request} req 사용자의 아이디(email) 정보
 * @param {Response} res 사용자의 관심글 목록 반환
 * @returns {Promise<void>}
 */
export const getUserLikePostList = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // 1. 사용자의 관심글로 저장된 postId 조회
    const request = new likePostRequestDto(req.body);
    const postIds = await likePostService.getUserLikePosts(request.email);

    // 2. 가져온 postId로 게시물 목록 조회
    const postList = await postService.getPostList(
      new postListRequestDto({
        postIds,
        page: request.page,
        limit: request.limit,
      })
    );

    res.status(200).json(postList);
  } catch (error) {
    handleErrorResponse(error as Error, res, "getUserLikePostList");
  }
};

/**
 * @description 사용자의 관심글 목록에 게시물 아이디 추가
 * @param {Request} req 사용자의 아이디(email) 정보, 게시물 id
 * @param {Response} res
 * @returns {Promise<void>}
 */
export const addUserLikePost = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const request = new updateLikePostRequestDto(req.body);
    await likePostService.addUserLikePost(request);

    res.status(200).json({ message: "Success added to liked posts" });
  } catch (error) {
    handleErrorResponse(error as Error, res, "addUserLikePost");
  }
};

/**
 * @description 사용자의 관심글 목록에서 게시물 아이디 삭제
 * @param {Request} req 사용자의 아이디(email) 정보, 게시물 id
 * @param {Response} res
 * @returns {Promise<void>}
 */
export const removeUserLikePost = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const request = new updateLikePostRequestDto(req.body);
    await likePostService.removeUserLikePost(request);

    res.status(200).json({ message: "Success removed from liked posts" });
  } catch (error) {
    handleErrorResponse(error as Error, res, "removeUserLikePost");
  }
};
