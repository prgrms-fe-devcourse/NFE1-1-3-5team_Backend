import {
  PostType,
  Position,
  Affiliation,
  Interest,
  ParticipationMethod,
  Duration,
  AvailableTime,
} from "@prisma/client";

export class PostResponseDto {
  id!: string;
  type!: PostType;
  user_id!: string;
  title!: string;
  content!: string;
  interests!: Interest[];
  position!: Position[];
  participation_method!: ParticipationMethod;
  created_at!: Date;
  // Project & Study Types
  recruitment_capacity?: number | null;
  duration?: Duration | null;
  recruitment_deadline?: Date | null;

  // Meet Type
  affiliation?: Affiliation | null;
  available_time?: AvailableTime | null;

  user_profile: {
    email: string;
    profile_image_url: string;
    nickname: string;
  } | null = null;

  constructor(data: Partial<PostResponseDto>) {
    this.id = data.id!;
    this.type = data.type!;
    this.user_id = data.user_id!;
    this.title = data.title!;
    this.content = data.content!;
    this.interests = data.interests ?? [];
    this.position = data.position!;
    this.participation_method = data.participation_method!;
    this.created_at = data.created_at!;
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
    // user_profile 초기화
    if (data.user_profile) {
      this.user_profile = {
        email: data.user_profile.email,
        profile_image_url: data.user_profile.profile_image_url,
        nickname: data.user_profile.nickname,
      };
    }
  }
}
