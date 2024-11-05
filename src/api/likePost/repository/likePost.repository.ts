import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getUserLikePosts = async (
  email: string
): Promise<string[] | []> => {
  const user = await prisma.userProfile.findUnique({
    where: { email },
    select: { like_post: true },
  });
  return user?.like_post || [];
};

export const addUserLikePost = async (
  email: string,
  postId: string
): Promise<void> => {
  await prisma.userProfile.update({
    where: { email },
    data: {
      like_post: {
        push: postId,
      },
    },
  });
};

export const removeUserLikePost = async (
  email: string,
  updateLikePosts: string[]
): Promise<void> => {
  await prisma.userProfile.update({
    where: { email },
    data: {
      like_post: {
        set: updateLikePosts,
      },
    },
  });
};
