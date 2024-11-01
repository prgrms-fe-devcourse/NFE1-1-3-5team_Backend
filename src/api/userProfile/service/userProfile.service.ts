import { findUserProfileByEmail } from "../repository/userProfile.repository";

export const getUserProfileByEmail = async (email: string) => {
  try {
    const user = await findUserProfileByEmail(email);

    if (!user) {
      throw new Error(`User with email ${email} not found`);
    }

    return user;
  } catch (error) {
    console.error(`Error fetching user by email: ${email}`, error);
    throw new Error(`Failed to retrieve user by email: ${email}`);
  }
};

export const updateUserProfileByEmail = async (email: string) => {};
