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

export const postPostDetail = async (
  req: Request,
  res: Response
): Promise<void> => {
  const postCreateDto = new PostCreateDto(req.body);

  try {
    const newPost = await createNewPost(postCreateDto);
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
  const { postId } = req.query;

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
  const { postId } = req.body;
  const postUpdateDto = new PostUpdateDto(req.body);

  if (!postId || typeof postId !== "string") {
    const badRequestError = new CustomError("Invalid post id", 400);

    res
      .status(badRequestError.statusCode)
      .json({ error: badRequestError.message });
    return;
  }

  try {
    const updatedPost = await updatePostById(postId, postUpdateDto);
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
  const { postId } = req.query;

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
