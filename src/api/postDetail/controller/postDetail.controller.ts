import { Request, Response } from "express";
import {
  createNewPost,
  getPostById,
  updatePostById,
  deletePostById,
} from "../service/postDetail.service";
import { PostCreateDto } from "../dto/PostCreate.dto";
import { PostUpdateDto } from "../dto/PostUpdate.dto";
import {
  CustomError,
  InternalServerError,
} from "../../../common/error/custom.error";

import { PostResponseDto } from "../dto/PostResponse.dto";
import { getUserObjectIdByEmail } from "../../userProfile/service/userProfile.service";
export const postPostDetail = async (
  req: Request,
  res: Response
): Promise<void> => {
  console.log("postPostDetail 함수에 도달했습니다.");
  console.log("전체 req.body 확인:", req.body);

  const { user_id, ...postData } = req.body;
  const email = user_id; //들어올 때는 user_id에 email이 들어있음
  console.log("분리된 email:", email); // 이 부분에서 email이 제대로 출력되는지 확인합니다.

  const postCreateDto = new PostCreateDto(postData);

  try {
    const newPost = await createNewPost(postCreateDto, email);
    const postResponseDto = new PostResponseDto(newPost);

    res.status(201).json(postResponseDto);
  } catch (error) {
    if (error instanceof CustomError) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      console.error(`Error creating new post`, error);
      const internalError = new InternalServerError(`Error creating new post`);

      res
        .status(internalError.statusCode)
        .json({ error: internalError.message });
    }
  }
};

export const getPostDetail = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id: postId } = req.params; // req.query 대신 req.params 사용

  if (!postId || typeof postId !== "string") {
    const badRequestError = new CustomError("Invalid post id", 400);

    res
      .status(badRequestError.statusCode)
      .json({ error: badRequestError.message });
    return;
  }

  try {
    const post = await getPostById(postId);
    const postResponseDto = new PostResponseDto(post);

    res.status(200).json(postResponseDto);
  } catch (error) {
    if (error instanceof CustomError) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      console.error(`Error fetching post by id: ${postId}`, error);
      const internalError = new InternalServerError(
        `Error fetching post by id: ${postId}`
      );

      res
        .status(internalError.statusCode)
        .json({ error: internalError.message });
    }
  }
};

export const patchPostDetail = async (
  req: Request,
  res: Response
): Promise<void> => {
  console.log("patchPostDetail 함수 호출됨");
  const { id: postId } = req.params;
  console.log("postId 내용:", postId);

  // `user_id`를 기존의 email값에서 진짜 id로 변환해서 맞춰줘야 post 동작이 정상적으로 돌아가네
  const userProfile = await getUserObjectIdByEmail(req.body.user_id);
  console.log("userProfile 내용:", userProfile);

  console.log("req.body 내용:", req.body);

  const userId = userProfile.id;
  console.log("userId 내용:", userId);

  const postUpdateDto = new PostUpdateDto({
    ...req.body,
    user_id: userId, // 변환된 `user_id` 설정
  });
  console.log("postUpdateDto 내용:", postUpdateDto);

  if (!postId || typeof postId !== "string") {
    const badRequestError = new CustomError("Invalid post id", 400);

    res
      .status(badRequestError.statusCode)
      .json({ error: badRequestError.message });
    return;
  }

  try {
    console.log("updatePostById 호출 직전"); // `updatePostById` 호출 직전 로그
    console.log("전송할 업데이트 데이터:", postUpdateDto); // 실제 전송되는 데이터 확인
    const updatedPost = await updatePostById(postId, postUpdateDto);
    console.log("updatePostById 호출 후");
    const postResponseDto = new PostResponseDto(updatedPost);

    res.status(200).json(postResponseDto);
  } catch (error) {
    if (error instanceof CustomError) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      console.error(`Error updating post by id: ${postId}`, error);
      const internalError = new InternalServerError(
        `Error updating post by id: ${postId}`
      );

      res
        .status(internalError.statusCode)
        .json({ error: internalError.message });
    }
  }
};

export const deletePostDetail = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id: postId } = req.params;
  console.log("deletePostDetail 함수 호출됨", postId);
  if (!postId || typeof postId !== "string") {
    const badRequestError = new CustomError("Invalid post id", 400);

    res
      .status(badRequestError.statusCode)
      .json({ error: badRequestError.message });
    return;
  }

  try {
    const deletedPost = await deletePostById(postId);
    const postResponseDto = new PostResponseDto(deletedPost);

    res.status(200).json(postResponseDto);
  } catch (error) {
    if (error instanceof CustomError) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      console.error(`Error deleting post by id: ${postId}`, error);
      const internalError = new InternalServerError(
        `Error deleting post by id: ${postId}`
      );

      res
        .status(internalError.statusCode)
        .json({ error: internalError.message });
    }
  }
};
