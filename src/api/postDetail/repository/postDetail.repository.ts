import { PrismaClient, Post } from "@prisma/client";
import { PostCreateDto } from "../dto/PostCreate.dto";
import { PostUpdateDto } from "../dto/PostUpdate.dto";
import { NotFoundError } from "../../../common/error/custom.error";

const prisma = new PrismaClient();

export const createPost = async (
  postCreateDto: PostCreateDto
): Promise<Post> => {
  return await prisma.post.create({
    data: {
      ...postCreateDto,
    },
  });
};

export const findPostById = async (
  postId: string
): Promise<Post & { user_profile: { email: string; nickname: string } }> => {
  const post = await prisma.post.findUnique({
    where: { id: postId },
    include: {
      user_profile: {
        select: {
          email: true,
          profile_image_url: true, // 필요한 필드만 선택
          nickname: true, // 작성자 닉네임
        },
      },
    },
  });

  if (!post) {
    console.log(`Post with id '${postId}' not found`);
    throw new NotFoundError(`Post with id '${postId}' not found`);
  }

  return post;
};

export const updatePost = async (
  postId: string,
  postUpdateDto: PostUpdateDto
): Promise<Post> => {
  // 이 라인 통과하면 post가 존재한다는 것을 보장
  // 예외처리는 findPostById에서 처리
  await findPostById(postId);

  const updatedPost = await prisma.post.update({
    where: { id: postId },
    data: postUpdateDto,
  });

  return updatedPost;
};

export const deletePost = async (postId: string): Promise<Post> => {
  // 이 라인 통과하면 post가 존재한다는 것을 보장
  await findPostById(postId);

  return await prisma.post.delete({
    where: { id: postId },
  });
};
