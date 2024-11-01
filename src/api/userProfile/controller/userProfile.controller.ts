import { Request, Response } from "express";
import {
  getUserProfileByEmail,
  updateUserProfileByEmail,
} from "../service/userProfile.service";
import { UserProfileResponseDto } from "../dto/UserProfileResponse.dto";
import { UserProfileUpdateDto } from "../dto/UserProfileUpdate.dto";

export const getUserProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email } = req.body;

  try {
    const userProfile = await getUserProfileByEmail(email);
    const userProfileResponseDto = new UserProfileResponseDto(userProfile);
    res.status(200).json(userProfileResponseDto);
  } catch (error) {
    res.status(500).json({
      error:
        (error as Error).message || `Error fetching user by email: ${email}`,
    });
  }
};

export const patchUserProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email } = req.body;
  const userProfileUpdateDto = new UserProfileUpdateDto(req.body);

  try {
    const updatedUserProfile = await updateUserProfileByEmail(
      email,
      userProfileUpdateDto
    );
    const userProfileResponseDto = new UserProfileResponseDto(
      updatedUserProfile
    );

    res.status(200).json(userProfileResponseDto);
  } catch (error) {
    res.status(500).json({ error: "유저 정보 수정 중 오류가 발생했습니다." });
  }
};
