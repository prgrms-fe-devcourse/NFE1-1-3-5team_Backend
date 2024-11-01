export class UserProfileResponseDto {
  nickname: string;
  position: string;

  constructor(partial: Partial<UserProfileResponseDto>) {}
}
