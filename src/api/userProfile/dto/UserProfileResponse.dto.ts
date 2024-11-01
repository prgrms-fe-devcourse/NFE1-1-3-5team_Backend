import { Position, Affiliation, Interest } from "@prisma/client";

export class UserProfileResponseDto {
  nickname!: string;
  position?: Position | null;
  affiliation?: Affiliation | null;
  bio?: string | null;
  interests?: Interest[];

  constructor(data: Partial<UserProfileResponseDto>) {
    this.nickname = data.nickname!;
    this.position = data.position;
    this.affiliation = data.affiliation;
    this.bio = data.bio;
    this.interests = data.interests;
  }
}
