import { PrismaClient } from "@prisma/client";
import { UserProfileUpdateDto } from "../dto/UserProfileUpdate.dto";
import { NotFoundError } from "../../../common/error/custom.error";

const prisma = new PrismaClient();

export const findUserProfileByEmail = async (email: string) => {
  const userProfile = await prisma.userProfile.findUnique({
    where: { email },
  });

  if (!userProfile) {
    console.log(`User with email '${email}' not found`);
    throw new NotFoundError(`User with email '${email}' not found`);
  }

  return userProfile;
};

export const updateUserProfile = async (
  email: string,
  userProfileUpdateDto: UserProfileUpdateDto
) => {
  const isUserProfileExist = await findUserProfileByEmail(email);

  if (!isUserProfileExist) {
    console.log(`User with email '${email}' not found`);
    throw new NotFoundError(`User with email '${email}' not found`);
  }

  const updatedUserProfile = await prisma.userProfile.update({
    where: { email },
    data: userProfileUpdateDto,
  });

  return updatedUserProfile;
};
