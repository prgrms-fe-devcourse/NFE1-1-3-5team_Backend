import { Request, Response } from "express";
import * as postService from "../service/postList.service";
import { postListRequestDto } from "../dto/postListRequest.dto";
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
    const filters = new postListRequestDto(req.body);
    const { postList, totalPage } = await postService.getPostList(filters);

    res.status(200).json({ postList, totalPage });
  } catch (error) {
    handleErrorResponse(error as Error, res, "getPostList");
  }
};

/**
 * @description 로그인된 사용자의 작성글 리스트 조회
 * @param {Request} req 필터링 조건을 포함
 * @param {Response} res 조회된 게시글 목록 반환
 * @returns {Promise<void>}
 */
export const getMyPostList = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const filters = new postListRequestDto(req.body);
    const { postList, totalPage } = await postService.getMyPostList(filters);

    res.status(200).json({ postList, totalPage });
  } catch (error) {
    handleErrorResponse(error as Error, res, "getMyPostList");
  }
};
