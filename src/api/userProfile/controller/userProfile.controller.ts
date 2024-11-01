import { Request, Response } from "express";
import { getUserProfileByEmail } from "../service/userProfile.service";
import { UserProfileResponseDto } from "../dto/UserProfileResponse.dto";

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
    res.status(500).json({ error: "유저 정보 조회 중 오류가 발생했습니다." });
  }
};

export const patchUserProfile = async (
  req: Request,
  res: Response
): Promise<void> => {};
