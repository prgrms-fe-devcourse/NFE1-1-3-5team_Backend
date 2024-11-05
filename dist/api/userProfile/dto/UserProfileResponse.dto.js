"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserProfileResponseDto = void 0;
class UserProfileResponseDto {
    constructor(data) {
        this.nickname = data.nickname;
        this.position = data.position;
        this.affiliation = data.affiliation;
        this.bio = data.bio;
        this.interests = data.interests;
    }
}
exports.UserProfileResponseDto = UserProfileResponseDto;