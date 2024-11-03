export interface postListResponseDto {
  // Post ID
  id: string;
  // 게시글 타입
  type: string;
  // 작성자 ID
  user_id: string;
  // 게시글 제목
  title: string;
  // 게시글 내용
  content: string;
  // 기술 스택
  interests: string[];
  // 포지션
  position: string;
  // 진행 방식
  participation_method: string;
  // 작성일
  created_at: Date;

  // 모집 인원
  recruitment_capacity?: number | null;
  // 예상 기간
  duration?: string | null;
  // 모집 마감일
  recruitment_deadline?: Date | null;
  // 소속
  affiliation?: string | null;
  // 가능한 시간대
  available_time?: string | null;
}
