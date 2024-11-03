import { PrismaClient } from "@prisma/client";
import { postListResponseDto } from "../dto/postListResponse.dto";

const prisma = new PrismaClient();

export const getPostList = async (
  filters: any,
  page: number,
  limit: number
): Promise<postListResponseDto[]> => {
  const skip = (page - 1) * limit;

  const posts = await prisma.post.findMany({
    where: filters,
    skip,
    take: limit,
    orderBy: { created_at: "desc" },
  });

  return posts;
};
