import { Request, Response } from "express";
import {
  getUserProfileByEmail,
  updateUserProfileByEmail,
} from "../service/userProfile.service";
import { UserProfileResponseDto } from "../dto/UserProfileResponse.dto";
import { UserProfileUpdateDto } from "../dto/UserProfileUpdate.dto";
import {
  CustomError,
  InternalServerError,
} from "../../../common/error/custom.error";

export const getUserProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email } = req.query;

  if (!email || typeof email !== "string") {
    const badRequestError = new CustomError("Invalid email", 400);

    res
      .status(badRequestError.statusCode)
      .json({ error: badRequestError.message });
    return;
  }

  try {
    const userProfile = await getUserProfileByEmail(email);
    const userProfileResponseDto = new UserProfileResponseDto(userProfile);

    res.status(200).json(userProfileResponseDto);
  } catch (error) {
    if (error instanceof CustomError) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      // service와 repository에서 처리하지 못한 error (예상하지 못한 에러)
      console.log(`Error fetching user by email: ${email}`, error);
      const internalError = new InternalServerError(
        `Error fetching user by email: ${email}`
      );

      res
        .status(internalError.statusCode)
        .json({ error: internalError.message });
    }
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
    if (error instanceof CustomError) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      // service와 repository에서 처리하지 못한 error (예상하지 못한 에러)
      console.log(`Error fetching user by email: ${email}`, error);
      const internalError = new InternalServerError(
        `Error fetching user by email: ${email}`
      );

      res
        .status(internalError.statusCode)
        .json({ error: internalError.message });
    }
  }
};
