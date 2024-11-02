import { Request, Response } from "express";
import * as postService from "../service/mainPosts.service";
import { MainPostsRequestDto } from "../dto/mainPostsRequest.dto";
import { handleErrorResponse } from "../../../common/error/custom.errorHandler";

/**
 * @description 주어진 필터링 조건을 기반으로 게시글 목록 조회
 * @param {Request} req 필터링 조건을 포함
 * @param {Response} res 조회된 게시글 목록 반환
 * @returns {Promise<void>}
 */
export const getPostList = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const filters = new MainPostsRequestDto(req.body);
    const postList = await postService.getPostList(filters);

    res.status(200).json(postList);
  } catch (error) {
    handleErrorResponse(error as Error, res, "getPostList");
  }
};
