import {
  PostType,
  Position,
  Affiliation,
  Interest,
  ParticipationMethod,
  Duration,
  AvailableTime,
} from "@prisma/client";

export class PostCreateDto {
  type!: PostType;
  user_id!: string;
  title!: string;
  content!: string;
  interests!: Interest[];
  position!: Position[];
  participation_method!: ParticipationMethod;
  created_at!: Date;
  updated_at!: Date;

  // Project & Study Types
  recruitment_capacity?: number;
  duration?: Duration;
  recruitment_deadline?: Date;

  // Meet Type
  affiliation?: Affiliation;
  available_time?: AvailableTime;

  constructor(data: Partial<PostCreateDto>) {
    this.type = data.type!;
    this.user_id = data.user_id!;
    this.title = data.title!;
    this.content = data.content!;
    this.interests = data.interests ?? [];
    this.position = data.position!;
    this.participation_method = data.participation_method!;
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
