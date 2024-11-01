import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const findUserProfileByEmail = async (email: string) => {
  return prisma.userProfile.findUnique({
    where: { email },
  });
};

export const updateUserProfile = async (email: string) => {};
