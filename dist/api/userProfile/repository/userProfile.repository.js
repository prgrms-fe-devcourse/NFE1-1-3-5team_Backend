"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserObjectId = exports.updateUserProfile = exports.findUserProfileByEmail = void 0;
const client_1 = require("@prisma/client");
const custom_error_1 = require("../../../common/error/custom.error");
const prisma = new client_1.PrismaClient();
const findUserProfileByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const userProfile = yield prisma.userProfile.findUnique({
        where: { email },
    });
    if (!userProfile) {
        console.log(`User with email '${email}' not found`);
        throw new custom_error_1.NotFoundError(`User with email '${email}' not found`);
    }
    return userProfile;
});
exports.findUserProfileByEmail = findUserProfileByEmail;
const updateUserProfile = (email, userProfileUpdateDto) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserProfileExist = yield (0, exports.findUserProfileByEmail)(email);
    if (!isUserProfileExist) {
        console.log(`User with email '${email}' not found`);
        throw new custom_error_1.NotFoundError(`User with email '${email}' not found`);
    }
    const updatedUserProfile = yield prisma.userProfile.update({
        where: { email },
        data: userProfileUpdateDto,
    });
    return updatedUserProfile;
});
exports.updateUserProfile = updateUserProfile;
const findUserObjectId = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const userObjecId = yield prisma.userProfile.findUnique({
        where: { email },
        select: { id: true },
    });
    if (!userObjecId) {
        console.log(`User with email '${email}' not found`);
        throw new custom_error_1.NotFoundError(`User with email '${email}' not found`);
    }
    return userObjecId;
});
exports.findUserObjectId = findUserObjectId;
