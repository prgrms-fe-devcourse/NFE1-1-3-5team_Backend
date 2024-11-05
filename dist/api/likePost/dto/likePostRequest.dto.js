"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateLikePostRequestDto = exports.likePostRequestDto = void 0;
class likePostRequestDto {
    // 게시글 아이디 (관심글 추가/삭제 시 사용)
    // postId?: string;
    constructor(data) {
        this.page = data.page || 1;
        this.limit = data.limit || 12;
        this.email = data.email;
        // this.postId = data.postId;
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
