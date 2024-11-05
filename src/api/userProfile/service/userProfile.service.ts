import {
  InternalServerError,
  NotFoundError,
} from "../../../common/error/custom.error";
import { UserProfileUpdateDto } from "../dto/UserProfileUpdate.dto";
import {
  findUserObjectId,
  findUserProfileByEmail,
  updateUserProfile,
} from "../repository/userProfile.repository";

export const getUserProfileByEmail = async (email: string) => {
  try {
    const userProfile = await findUserProfileByEmail(email);

    return userProfile;
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error;
    }

    console.error(`Error fetching user by email: ${email}`, error);
    throw new InternalServerError(`Error fetching user by email: ${email}`);
  }
};

export const updateUserProfileByEmail = async (
  email: string,
  userProfileUpdateDto: UserProfileUpdateDto
) => {
  try {
    const updatedUserProfile = await updateUserProfile(
      email,
      userProfileUpdateDto
    );

    return updatedUserProfile;
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error;
    }

    console.error(`Error updating user by email: ${email}`, error);
    throw new InternalServerError(`Error fetching user by email: ${email}`);
  }
};

export const getUserObjectIdByEmail = async (email: string) => {
  try {
    const userObjectId = await findUserObjectId(email);

    return userObjectId;
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error;
    }

    console.error(`Error fetching user object id by email: ${email}`, error);
    throw new InternalServerError(
      `Error fetching user object id by email: ${email}`
    );
  }
};
