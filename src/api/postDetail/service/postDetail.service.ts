import { Post } from "@prisma/client";
import {
  createPost,
  findPostById,
  updatePost,
  deletePost,
} from "../repository/postDetail.repository";
import { PostCreateDto } from "../dto/PostCreate.dto";
import { PostUpdateDto } from "../dto/PostUpdate.dto";
import {
  InternalServerError,
  NotFoundError,
} from "../../../common/error/custom.error";
import { getUserObjectIdByEmail } from "../../userProfile/service/userProfile.service";

export const createNewPost = async (
  postCreateDto: PostCreateDto,
  email: string
): Promise<Post> => {
  try {
    // 1. 이메일로 사용자 고유 ID 조회
    const userProfile = await getUserObjectIdByEmail(email);
    if (!userProfile) {
      throw new NotFoundError("User profile not found");
    }

    // 2. postCreateDto의 user_id를 ObjectId로 설정
    postCreateDto.user_id = userProfile.id;

    // 3. 변경된 postCreateDto로 새로운 포스트 생성
    const newPost = await createPost(postCreateDto);

    return newPost;
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error;
    }

    console.error(`Error creating new post`, error);
    throw new InternalServerError(`Error creating new post`);
  }
};

export const getPostById = async (postId: string): Promise<Post> => {
  try {
    const post = await findPostById(postId);

    return post;
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error;
    }

    console.error(`Error fetching post by id: ${postId}`, error);
    throw new InternalServerError(`Error fetching post by id: ${postId}`);
  }
};

export const updatePostById = async (
  postId: string,
  postUpdateDto: PostUpdateDto
): Promise<Post> => {
  try {
    const updatedPost = await updatePost(postId, postUpdateDto);

    return updatedPost;
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error;
    }

    console.error(`Error updating post by id: ${postId}`, error);
    throw new InternalServerError(`Error updating post by id: ${postId}`);
  }
};

export const deletePostById = async (postId: string): Promise<Post> => {
  try {
    const deletedPost = await deletePost(postId);

    return deletedPost;
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error;
    }

    console.error(`Error deleting post by id: ${postId}`, error);
    throw new InternalServerError(`Error deleting post by id: ${postId}`);
  }
};
