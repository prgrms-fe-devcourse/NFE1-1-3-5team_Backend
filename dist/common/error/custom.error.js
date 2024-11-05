"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalServerError = exports.NotFoundError = exports.ForbiddenError = exports.UnauthorizedError = exports.BadRequestError = exports.CustomError = void 0;
const ErrorPrefix = {
    BAD_REQUEST: "Bad Request Error: ",
    UNAUTHORIZED: "Unauthorized Error: ",
    FORBIDDEN: "Forbidden Error: ",
    NOT_FOUND: "Not Found Error: ",
    INTERNAL_SERVER: "Internal Server Error: ",
};
class CustomError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
    }
}
exports.CustomError = CustomError;
class BadRequestError extends CustomError {
    constructor(message) {
        super(ErrorPrefix.BAD_REQUEST + message, 400);
    }
}
exports.BadRequestError = BadRequestError;
class UnauthorizedError extends CustomError {
    constructor(message) {
        super(ErrorPrefix.UNAUTHORIZED + message, 401);
    }
}
exports.UnauthorizedError = UnauthorizedError;
class ForbiddenError extends CustomError {
    constructor(message) {
        super(ErrorPrefix.FORBIDDEN + message, 403);
    }
}
exports.ForbiddenError = ForbiddenError;
class NotFoundError extends CustomError {
    constructor(message) {
        super(ErrorPrefix.NOT_FOUND + message, 404);
    }
}
exports.NotFoundError = NotFoundError;
class InternalServerError extends CustomError {
    constructor(message = "Internal Server Error Occurred") {
        super(ErrorPrefix.INTERNAL_SERVER + message, 500);
    }
}
exports.InternalServerError = InternalServerError;
