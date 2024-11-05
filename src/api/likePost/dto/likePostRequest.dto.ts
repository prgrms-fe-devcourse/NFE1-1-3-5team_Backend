export class likePostRequestDto {
  // 페이지 번호
  page?: number;
  // 페이지당 게시글 수
  limit?: number;
  // 사용자 아이디
  email: string;
  // 게시글 아이디 (관심글 추가/삭제 시 사용)
  // postId?: string;

  constructor(data: Partial<likePostRequestDto>) {
    this.page = data.page || 1;
    this.limit = data.limit || 12;
    this.email = data.email!;
    // this.postId = data.postId;
  }
}

export class updateLikePostRequestDto extends likePostRequestDto {
  postId: string;

  constructor(data: Partial<updateLikePostRequestDto>) {
    super(data);
    this.postId = data.postId!;
  }
}
