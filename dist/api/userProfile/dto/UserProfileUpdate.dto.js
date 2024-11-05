"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserProfileUpdateDto = void 0;
class UserProfileUpdateDto {
    constructor(data) {
        var _a;
        this.nickname = data.nickname;
        this.position = data.position;
        this.affiliation = data.affiliation;
        this.bio = data.bio;
        this.interests = (_a = data.interests) !== null && _a !== void 0 ? _a : [];
        this.updated_at = new Date();
    }
}
exports.UserProfileUpdateDto = UserProfileUpdateDto;
