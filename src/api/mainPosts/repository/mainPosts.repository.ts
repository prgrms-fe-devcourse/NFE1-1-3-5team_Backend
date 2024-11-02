import { PrismaClient } from "@prisma/client";
import { MainPostsResponseDto } from "../dto/mainPostsResponse.dto";

const prisma = new PrismaClient();

export const getPostList = async (
  filters: any,
  page: number,
  limit: number
): Promise<MainPostsResponseDto[]> => {
  const skip = (page - 1) * limit;

  const posts = await prisma.post.findMany({
    where: filters,
    skip,
    take: limit,
    orderBy: { created_at: "desc" },
  });

  return posts;
};
