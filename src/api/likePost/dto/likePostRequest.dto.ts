export class likePostRequestDto {
  // 페이지 번호
  page?: number;
  // 페이지당 게시글 수
  limit?: number;
  // 로그인 사용자 ID
  loginId: string;

  constructor(data: Partial<likePostRequestDto>) {
    this.page = data.page || 1;
    this.limit = data.limit || 12;
    this.loginId = data.loginId!;
  }
}

export class updateLikePostRequestDto extends likePostRequestDto {
  postId: string;

  constructor(data: Partial<updateLikePostRequestDto>) {
    super(data);
    this.postId = data.postId!;
  }
}
