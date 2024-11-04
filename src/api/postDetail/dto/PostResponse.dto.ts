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
  title!: string;
  content!: string;
  interests!: Interest[];
  position!: Position;
  participation_method!: ParticipationMethod;

  // Project & Study Types
  recruitment_capacity?: number;
  duration?: Duration;
  recruitment_deadline?: Date;

  // Meet Type
  affiliation?: Affiliation;
  available_time?: AvailableTime;

  constructor(data: Partial<PostResponseDto>) {
    this.id = data.id!;
    this.type = data.type!;
    this.title = data.title!;
    this.content = data.content!;
    this.interests = data.interests ?? [];
    this.position = data.position!;
    this.participation_method = data.participation_method!;

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
