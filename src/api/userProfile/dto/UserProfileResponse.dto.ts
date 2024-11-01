import { Position, Affiliation, Interest } from "@prisma/client";

export class UserProfileResponseDto {
  nickname!: string;
  position?: Position;
  affiliation?: Affiliation;
  bio?: string;
  interests?: Interest[];

  constructor(partial: Partial<UserProfileResponseDto>) {
    this.nickname = partial.nickname!;
    this.position = partial.position;
    this.affiliation = partial.affiliation;
    this.bio = partial.bio;
    this.interests = partial.interests;
  }
}
