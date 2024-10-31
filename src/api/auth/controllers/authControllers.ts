import { Request, Response } from "express";
import {
  findUserProfileByEmail,
  findUserLoginByEmail,
  createUserProfile,
  createUserLogin,
  deleteUserProfile,
  deleteUserLogin,
  generateToken,
} from "../service/authService";
import bcrypt from "bcrypt";

// 로그인 기능
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const userProfile = await findUserProfileByEmail(email);

    if (!userProfile) {
      res.status(400).json({ error: "이메일 또는 비밀번호가 잘못되었습니다." });
      return;
    }

    const userLogin = await findUserLoginByEmail(userProfile.email);

    if (!userLogin) {
      res.status(400).json({ error: "이메일 또는 비밀번호가 잘못되었습니다." });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, userLogin.password);
    if (!isPasswordValid) {
      res.status(400).json({ error: "이메일 또는 비밀번호가 잘못되었습니다." });
      return;
    }

    const token = generateToken(userProfile.id);

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: "서버 오류가 발생했습니다." });
  }
};

// 회원가입 기능
export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email, password, nickname } = req.body;

  try {
    const newUserProfile = await createUserProfile(email, nickname);
    await createUserLogin(newUserProfile.email, password);

    const token = generateToken(newUserProfile.id);

    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ error: "회원가입 중 오류가 발생했습니다." });
  }
};

// 유저 삭제 기능 (회원 탈퇴)
export const deleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email } = req.params;

  try {
    const user = await deleteUserProfile(email);
    await deleteUserLogin(email);

    res.status(200).json({ message: "유저가 삭제되었습니다.", user });
  } catch (error) {
    res.status(500).json({ error: "유저 삭제 중 오류가 발생했습니다." });
  }
};
