"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostCreateDto = void 0;
class PostCreateDto {
    constructor(data) {
        var _a;
        this.type = data.type;
        this.user_id = data.user_id;
        this.title = data.title;
        this.content = data.content;
        this.interests = (_a = data.interests) !== null && _a !== void 0 ? _a : [];
        this.position = data.position;
        this.participation_method = data.participation_method;
        this.created_at = new Date();
        this.updated_at = new Date();
        // Type별 필드
        if (this.type === "PROJECT" || this.type === "STUDY") {
            this.recruitment_capacity = data.recruitment_capacity;
            this.duration = data.duration;
            this.recruitment_deadline = data.recruitment_deadline;
        }
        if (this.type === "MEET") {
            this.affiliation = data.affiliation;
            this.available_time = data.available_time;
        }
    }
}
exports.PostCreateDto = PostCreateDto;
