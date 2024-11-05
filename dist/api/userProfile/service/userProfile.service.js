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
exports.getUserObjectIdByEmail = exports.updateUserProfileByEmail = exports.getUserProfileByEmail = void 0;
const custom_error_1 = require("../../../common/error/custom.error");
const userProfile_repository_1 = require("../repository/userProfile.repository");
const getUserProfileByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userProfile = yield (0, userProfile_repository_1.findUserProfileByEmail)(email);
        return userProfile;
    }
    catch (error) {
        if (error instanceof custom_error_1.NotFoundError) {
            throw error;
        }
        console.error(`Error fetching user by email: ${email}`, error);
        throw new custom_error_1.InternalServerError(`Error fetching user by email: ${email}`);
    }
});
exports.getUserProfileByEmail = getUserProfileByEmail;
const updateUserProfileByEmail = (email, userProfileUpdateDto) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedUserProfile = yield (0, userProfile_repository_1.updateUserProfile)(email, userProfileUpdateDto);
        return updatedUserProfile;
    }
    catch (error) {
        if (error instanceof custom_error_1.NotFoundError) {
            throw error;
        }
        console.error(`Error updating user by email: ${email}`, error);
        throw new custom_error_1.InternalServerError(`Error fetching user by email: ${email}`);
    }
});
exports.updateUserProfileByEmail = updateUserProfileByEmail;
const getUserObjectIdByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userObjectId = yield (0, userProfile_repository_1.findUserObjectId)(email);
        return userObjectId;
    }
    catch (error) {
        if (error instanceof custom_error_1.NotFoundError) {
            throw error;
        }
        console.error(`Error fetching user object id by email: ${email}`, error);
        throw new custom_error_1.InternalServerError(`Error fetching user object id by email: ${email}`);
    }
});
exports.getUserObjectIdByEmail = getUserObjectIdByEmail;
