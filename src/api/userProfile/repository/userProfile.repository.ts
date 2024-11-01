import { PrismaClient } from "@prisma/client";
import { UserProfileUpdateDto } from "../dto/UserProfileUpdate.dto";

const prisma = new PrismaClient();

export const findUserProfileByEmail = async (email: string) => {
  const userProfile = await prisma.userProfile.findUnique({
    where: { email },
  });

  if (!userProfile) {
    throw new Error(`User with email ${email} not found`);
  }

  return userProfile;
};

export const updateUserProfile = async (
  email: string,
  userProfileUpdateDto: UserProfileUpdateDto
) => {
  const isUserProfileExist = await findUserProfileByEmail(email);

  if (!isUserProfileExist) {
    throw new Error(`User with email ${email} not found`);
  }

  const updatedUserProfile = await prisma.userProfile.update({
    where: { email },
    data: userProfileUpdateDto,
  });

  return updatedUserProfile;
};
