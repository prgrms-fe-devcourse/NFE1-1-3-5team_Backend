import { CustomError, InternalServerError } from "../error/custom.error";
import { Response } from "express";

/**
 * @description 특정 컨텍스트에서 발생한 에러를 콘솔에 기록
 * @param error - 발생한 에러 객체
 * @param context - 에러가 발생한 컨텍스트(위치나 함수명 등)
 */
export const logError = (error: Error, context: string) => {
  console.error(`Error in ${context}:`, error);
};

/**
 * @description 클라이언트 요청 처리 중 발생한 에러에 대한 응답을 전송
 *              (CustomError의 인스턴스일 경우 지정된 상태 코드와 메시지를, 그렇지 않은 경우 500 상태 코드를 반환)
 * @param error - 발생한 에러 객체
 * @param res - Express의 Response 객체
 * @param context - 에러가 발생한 컨텍스트(위치나 함수명 등)
 */
export const handleErrorResponse = (
  error: Error,
  res: Response,
  context: string
) => {
  if (error instanceof CustomError) {
    res.status(error.statusCode).json({ error: error.message });
  } else {
    logError(error, context);
    const internalError = new InternalServerError(
      `Unexpected error in ${context}`
    );
    res.status(internalError.statusCode).json({ error: internalError.message });
  }
};
