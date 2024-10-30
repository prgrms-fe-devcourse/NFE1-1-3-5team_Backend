import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

// 로그인 기능
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { user_email, password } = req.body;

  try {
    // 이메일로 유저 프로필을 먼저 찾기
    const userProfile = await prisma.userProfile.findUnique({
      where: { email: user_email },
    });

    if (!userProfile) {
      res.status(400).json({ error: "이메일 또는 비밀번호가 잘못되었습니다." });
      return;
    }

    // 해당 프로필의 user_id로 로그인 정보 찾기
    const userLogin = await prisma.userLogin.findUnique({
      where: { user_id: userProfile.user_id },
    });

    if (!userLogin) {
      res.status(400).json({ error: "이메일 또는 비밀번호가 잘못되었습니다." });
      return;
    }

    // 비밀번호 비교
    const isPasswordValid = await bcrypt.compare(password, userLogin.password);
    if (!isPasswordValid) {
      res.status(400).json({ error: "이메일 또는 비밀번호가 잘못되었습니다." });
      return;
    }

    // JWT 토큰 생성
    const token = jwt.sign({ userId: userProfile.user_id }, "your_jwt_secret", {
      expiresIn: "1h",
    });

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
  const { user_email, password, nickname } = req.body;

  try {
    // 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(password, 10);

    // 새로운 사용자 생성
    const newUserProfile = await prisma.userProfile.create({
      data: {
        email: user_email,
        nickname: nickname, // 필수 필드 추가
        // 다른 필드도 추가 가능 (예: name, etc.)
      },
    });

    await prisma.userLogin.create({
      data: {
        user_id: newUserProfile.user_id, // 새로 생성된 userProfile의 user_id
        password: hashedPassword,
      },
    });

    // JWT 생성
    const token = jwt.sign(
      { userId: newUserProfile.user_id },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ error: "회원가입 중 오류가 발생했습니다." });
  }
};
