import express from "express";

const router = express.Router();

// post detail 작성 라우트
router.post("/", () => {});

// post detail 조회 라우트
router.get("/:id", () => {});

// post detail 수정 라우트
router.patch("/:id", () => {});

// post detail 삭제 라우트
router.delete("/:id", () => {});

export default router;
