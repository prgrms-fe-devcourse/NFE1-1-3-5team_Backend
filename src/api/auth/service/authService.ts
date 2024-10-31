import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
  return prisma.userProfile.create({
    data: {
      email,
      nickname,
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
