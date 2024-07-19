/**
 * /posts/index의 테이블 설정
 *  */
export const columns = [
  {
    name: 'title',
    label: '제목',
    align: 'left',
    style: 'width: 60%; font-weight: bold',
  },
  {
    name: 'name',
    label: '작성자',
    align: 'center',
    style: 'width: 10%',
  },
  {
    name: 'createdAt',
    label: '작성일',
    align: 'center',
    style: 'width: 10%',
  },
  {
    name: 'readCount',
    label: '조회',
    align: 'center',
    style: 'width: 10%',
  },
  {
    name: 'likeCount',
    label: '좋아요',
    align: 'center',
    style: 'width: 10%',
  },
];

export const searchOption = [
  {
    label: '- ALL -',
    value: '',
  },
  {
    label: '작성자',
    value: 'name',
  },
  {
    label: '타이틀',
    value: 'title',
  },
  {
    label: '조회수 높은 순',
    value: 'readDesc',
  },
  {
    label: '조회수 낮은 순',
    value: 'readAsc',
  },
  {
    label: '좋아요 높은 순',
    value: 'likeDesc',
  },
  {
    label: '좋아요 낮은 순',
    value: 'likeAsc',
  },
];
