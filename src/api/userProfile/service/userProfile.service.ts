import { UserProfileUpdateDto } from "../dto/UserProfileUpdate.dto";
import {
  findUserProfileByEmail,
  updateUserProfile,
} from "../repository/userProfile.repository";

export const getUserProfileByEmail = async (email: string) => {
  try {
    const userProfile = await findUserProfileByEmail(email);

    return userProfile;
  } catch (error) {
    console.error(`Error fetching user by email: ${email}`, error);
    throw new Error(
      error instanceof Error
        ? error.message
        : `Error fetching user by email: ${email}`
    );
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
    console.error(`Error updating user by email: ${email}`, error);
    throw new Error(`Failed to update user by email: ${email}`);
  }
};
