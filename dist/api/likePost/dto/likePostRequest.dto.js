"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateLikePostRequestDto = exports.likePostRequestDto = void 0;
class likePostRequestDto {
    constructor(data) {
        this.page = data.page || 1;
        this.limit = data.limit || 12;
        this.loginId = data.loginId;
    }
}
exports.likePostRequestDto = likePostRequestDto;
class updateLikePostRequestDto extends likePostRequestDto {
    constructor(data) {
        super(data);
        this.postId = data.postId;
    }
}
exports.updateLikePostRequestDto = updateLikePostRequestDto;
