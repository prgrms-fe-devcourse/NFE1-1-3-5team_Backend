import * as postRepository from "../repository/postList.repository";
import { postListRequestDto } from "../dto/postListRequest.dto";
import { postListResponseDto } from "../dto/postListResponse.dto";

export const getPostList = async (
  filters: postListRequestDto
): Promise<{ postList: postListResponseDto[]; totalPage: number }> => {
  const queryFilters: any = {};

  // 1. 검색어 있는 경우
  if (filters.searchTerm) {
    queryFilters.OR = [
      { title: { contains: filters.searchTerm, mode: "insensitive" } },
      { content: { contains: filters.searchTerm, mode: "insensitive" } },
    ];
  }

  // 2. 필터링 조건이 있는 경우 && 전체 조회가 아닌 경우
  if (filters.postType && filters.postType !== "ALL")
    queryFilters.type = filters.postType;
  if (filters.position && filters.position !== "ALL")
    queryFilters.position = { hasSome: [filters.position] };
  if (filters.participationMethod && filters.participationMethod !== "ALL")
    queryFilters.participation_method = filters.participationMethod;
  if (filters.interests && filters.interests.length > 0) {
    queryFilters.interests = { hasSome: filters.interests };
  }

  // 3. 작성글 조회할 경우
  if (filters.userId) queryFilters.user_id = filters.userId;

  // 4. 관심글 조회할 경우
  if (filters.postIds && filters.postIds.length > 0) {
    queryFilters.id = { in: filters.postIds };
  }

  // 5. 로그인했을 경우
  const loginId = filters.loginId ? filters.loginId : null;
  console.log(loginId);

  // 페이지네이션
  const page = filters.page;
  const limit = filters.limit;

  const { postList, totalPage } = await postRepository.getPostList(
    queryFilters,
    loginId,
    page,
    limit
  );

  return { postList, totalPage };
};
