"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postListRequestDto = void 0;
class postListRequestDto {
    constructor(data) {
        var _a, _b;
        this.page = data.page || 1;
        this.limit = data.limit || 8;
        this.searchTerm = data.searchTerm;
        this.postType = data.postType;
        this.interests = (_a = data.interests) !== null && _a !== void 0 ? _a : [];
        this.position = data.position;
        this.participationMethod = data.participationMethod;
        this.userId = data.userId;
        this.postIds = (_b = data.postIds) !== null && _b !== void 0 ? _b : [];
        this.loginId = data.loginId;
    }
}
exports.postListRequestDto = postListRequestDto;
