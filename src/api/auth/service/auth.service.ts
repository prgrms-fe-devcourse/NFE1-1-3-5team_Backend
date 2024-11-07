import { PrismaClient } from "@prisma/client";
import axios from "axios";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateRandomProfileIndex } from "../../../util/profileIndexGenerator";

const prisma = new PrismaClient();

export const findUserProfileByEmail = async (email: string) => {
  return prisma.userProfile.findUnique({
    where: { email },
  });
};

export const findUserLoginByEmail = async (email: string) => {
  return prisma.userLogin.findUnique({
    where: { email },
  });
};

export const createUserProfile = async (email: string, nickname: string) => {
  const profile_image_index = generateRandomProfileIndex();

  return prisma.userProfile.create({
    data: {
      email,
      nickname,
      profile_image_index,
    },
  });
};

export const createUserLogin = async (email: string, password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return prisma.userLogin.create({
    data: {
      email,
      password: hashedPassword,
    },
  });
};

export const updateUserLoginInfo = async (
  email: string,
  isFirstLogin: boolean,
  lastLoginAt: Date | null,
  loginFailCount: number
) => {
  return prisma.userLogin.update({
    where: { email },
    data: {
      is_first_login: isFirstLogin,
      last_logined_at: lastLoginAt,
      login_fail_count: loginFailCount,
    },
  });
};

export const deleteUserProfile = async (email: string) => {
  return prisma.userProfile.delete({
    where: { email },
  });
};

export const deleteUserLogin = async (email: string) => {
  return prisma.userLogin.delete({
    where: { email },
  });
};

export const generateToken = (userId: string) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET as string, {
    expiresIn: "1h",
  });
};

export const syncWithChatService = async (
  user_id: string,
  user_nickname: string
) => {
  const userData = {
    user_id: user_id, // user_id를 email로 설정
    user_nickname: user_nickname, // nickname 사용
  };
  //SEVER URL은 임시
  // /register/nickname API에 POST 요청
  await axios.post("http://59.8.137.118:5172/register/nickname", userData);
};
