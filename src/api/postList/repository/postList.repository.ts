import { PrismaClient } from "@prisma/client";
import { postListResponseDto } from "../dto/postListResponse.dto";
import { getUserLikePosts } from "../../likePost/repository/likePost.repository";

const prisma = new PrismaClient();

export const getPostList = async (
  filters: any,
  loginId: string | null,
  page: number,
  limit: number
): Promise<{ postList: postListResponseDto[]; totalPage: number }> => {
  const skip = (page - 1) * limit;

  // 1. 전체 게시글 수
  const totalPosts = await prisma.post.count({
    where: filters,
  });

  // 2. 현재 페이지의 게시글 목록
  const postListData = await prisma.post.findMany({
    where: filters,
    skip,
    take: limit,
    orderBy: { created_at: "desc" },
    include: {
      user_profile: {
        select: { nickname: true },
      },
    },
  });

  // 3. 로그인한 사용자의 관심글 목록 조회해서 데이터 재생성
  const likePostIds = loginId ? await getUserLikePosts(loginId) : "";
  const postList = postListData.map((post: postListResponseDto) => ({
    ...post,
    isLiked: loginId ? likePostIds.includes(post.id) : false,
  }));

  // 4. 전체 페이지 수
  const totalPage = Math.ceil(totalPosts / limit);

  return { postList, totalPage };
};

export const getUserId = async (
  loginId: string
): Promise<{ id: string | null }> => {
  const user = await prisma.userProfile.findUnique({
    where: { email: loginId },
    select: { id: true },
  });

  return user ? user : { id: null };
};
