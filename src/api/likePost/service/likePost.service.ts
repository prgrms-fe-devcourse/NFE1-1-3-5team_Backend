import * as likePostRepository from "../repository/likePost.repository";
import { updateLikePostRequestDto } from "../dto/likePostRequest.dto";
import { CustomError } from "../../../common/error/custom.error";

export const getUserLikePosts = async (loginId: string): Promise<string[]> => {
  const postIds = await likePostRepository.getUserLikePosts(loginId);
  // if (postIds.length === 0) {
  //   throw new CustomError("Not found user liked posts", 404);
  // }
  return postIds;
};

export const addUserLikePost = async (request: updateLikePostRequestDto) => {
  await likePostRepository.addUserLikePost(request.loginId, request.postId);
};

export const removeUserLikePost = async (request: updateLikePostRequestDto) => {
  // 1. 사용자의 관심글 목록 조회
  const currentLikePosts = await likePostRepository.getUserLikePosts(
    request.loginId
  );
  // 2. 사용자의 관심글 목록에서 제거
  const updateLikePosts = currentLikePosts.filter(
    (id) => id !== request.postId
  );
  // 3. 사용자의 관심글 목록 업데이트
  await likePostRepository.removeUserLikePost(request.loginId, updateLikePosts);
};
