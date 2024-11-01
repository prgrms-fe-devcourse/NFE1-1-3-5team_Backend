const ErrorPrefix = {
  BAD_REQUEST: "Bad Request Error: ",
  UNAUTHORIZED: "Unauthorized Error: ",
  FORBIDDEN: "Forbidden Error: ",
  NOT_FOUND: "Not Found Error: ",
  INTERNAL_SERVER: "Internal Server Error: ",
} as const;

export class CustomError extends Error {
  constructor(readonly message: string, readonly statusCode: number) {
    super(message);
  }
}

export class BadRequestError extends CustomError {
  constructor(message: string) {
    super(ErrorPrefix.BAD_REQUEST + message, 400);
  }
}

export class UnauthorizedError extends CustomError {
  constructor(message: string) {
    super(ErrorPrefix.UNAUTHORIZED + message, 401);
  }
}

export class ForbiddenError extends CustomError {
  constructor(message: string) {
    super(ErrorPrefix.FORBIDDEN + message, 403);
  }
}

export class NotFoundError extends CustomError {
  constructor(message: string) {
    super(ErrorPrefix.NOT_FOUND + message, 404);
  }
}

export class InternalServerError extends CustomError {
  constructor(message: string = "Internal Server Error Occurred") {
    super(ErrorPrefix.INTERNAL_SERVER + message, 500);
  }
}
