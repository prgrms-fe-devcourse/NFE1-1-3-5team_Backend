export class postListRequestDto {
  // 페이지 번호
  page: number;
  // 페이지당 게시글 수
  limit: number;

  // 검색어
  searchTerm?: string;
  // 게시글 타입 (탭 구분)
  postType?: string;
  // 기술 스택
  interests?: string[];
  // 포지션
  position?: string;
  // 진행 방식
  participationMethod?: string;

  // 작성자 ID
  userId?: string;
  // 게시물 ID 리스트
  postIds?: string[];

  constructor(data: Partial<postListRequestDto>) {
    this.page = data.page || 1;
    this.limit = data.limit || 8;
    this.searchTerm = data.searchTerm;
    this.postType = data.postType;
    this.interests = data.interests ?? [];
    this.position = data.position;
    this.participationMethod = data.participationMethod;
    this.userId = data.userId;
    this.postIds = data.postIds ?? [];
  }
}
