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
exports.patchUserProfile = exports.getUserProfile = void 0;
const userProfile_service_1 = require("../service/userProfile.service");
const UserProfileResponse_dto_1 = require("../dto/UserProfileResponse.dto");
const UserProfileUpdate_dto_1 = require("../dto/UserProfileUpdate.dto");
const custom_error_1 = require("../../../common/error/custom.error");
const auth_service_1 = require("../../auth/service/auth.service");
const getUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.query;
    if (!email || typeof email !== "string") {
        const badRequestError = new custom_error_1.CustomError("Invalid email", 400);
        res
            .status(badRequestError.statusCode)
            .json({ error: badRequestError.message });
        return;
    }
    try {
        const userProfile = yield (0, userProfile_service_1.getUserProfileByEmail)(email);
        const userProfileResponseDto = new UserProfileResponse_dto_1.UserProfileResponseDto(userProfile);
        res.status(200).json(userProfileResponseDto);
    }
    catch (error) {
        if (error instanceof custom_error_1.CustomError) {
            res.status(error.statusCode).json({ error: error.message });
        }
        else {
            // service와 repository에서 처리하지 못한 error (예상하지 못한 에러)
            console.log(`Error fetching user by email: ${email}`, error);
            const internalError = new custom_error_1.InternalServerError(`Error fetching user by email: ${email}`);
            res
                .status(internalError.statusCode)
                .json({ error: internalError.message });
        }
    }
});
exports.getUserProfile = getUserProfile;
const patchUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const userProfileUpdateDto = new UserProfileUpdate_dto_1.UserProfileUpdateDto(req.body);
    try {
        const updatedUserProfile = yield (0, userProfile_service_1.updateUserProfileByEmail)(email, userProfileUpdateDto);
        //채팅 서비스와 닉네임 연동
        yield (0, auth_service_1.syncWithChatService)(updatedUserProfile.email, updatedUserProfile.nickname, updatedUserProfile.profile_image_index);
        const userProfileResponseDto = new UserProfileResponse_dto_1.UserProfileResponseDto(updatedUserProfile);
        res.status(200).json(userProfileResponseDto);
    }
    catch (error) {
        if (error instanceof custom_error_1.CustomError) {
            res.status(error.statusCode).json({ error: error.message });
        }
        else {
            // service와 repository에서 처리하지 못한 error (예상하지 못한 에러)
            console.log(`Error fetching user by email: ${email}`, error);
            const internalError = new custom_error_1.InternalServerError(`Error fetching user by email: ${email}`);
            res
                .status(internalError.statusCode)
                .json({ error: internalError.message });
        }
    }
});
exports.patchUserProfile = patchUserProfile;
