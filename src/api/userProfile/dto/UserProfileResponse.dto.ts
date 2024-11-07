import { Position, Affiliation, Interest } from "@prisma/client";

export class UserProfileResponseDto {
  nickname!: string;
  position?: Position | null;
  affiliation?: Affiliation | null;
  bio?: string | null;
  interests?: Interest[];
  profile_image_index!: number;

  constructor(data: Partial<UserProfileResponseDto>) {
    this.nickname = data.nickname!;
    this.position = data.position;
    this.affiliation = data.affiliation;
    this.bio = data.bio;
    this.interests = data.interests;
    this.profile_image_index = data.profile_image_index!;
  }
}
