"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostResponseDto = void 0;
class PostResponseDto {
    constructor(data) {
        var _a;
        this.id = data.id;
        this.type = data.type;
        this.user_id = data.user_id;
        this.title = data.title;
        this.content = data.content;
        this.interests = (_a = data.interests) !== null && _a !== void 0 ? _a : [];
        this.position = data.position;
        this.participation_method = data.participation_method;
        // 조건부 필드 초기화
        if (data.type === "PROJECT" || data.type === "STUDY") {
            this.recruitment_capacity = data.recruitment_capacity;
            this.duration = data.duration;
            this.recruitment_deadline = data.recruitment_deadline;
        }
        if (data.type === "MEET") {
            this.affiliation = data.affiliation;
            this.available_time = data.available_time;
        }
    }
}
exports.PostResponseDto = PostResponseDto;
