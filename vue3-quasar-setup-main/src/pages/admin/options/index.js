export const postsColumns = [
  {
    name: 'content',
    label: '구분',
    field: 'content',
    align: 'left',
    style: 'width: 70%',
  },
  {
    name: 'category',
    label: '카테고리',
    field: 'category',
    align: 'center',
    style: 'width: 15%',
  },
  {
    name: 'useYn',
    label: '사용여부',
    field: 'useYn',
    align: 'center',
    style: 'width: 5%',
  },
  {
    name: 'createdAt',
    label: '작성일',
    field: 'createdAt',
    align: 'center',
    style: 'width: 10%',
    sortable: true,
  },
];

export const postSerchOptions = [
  {
    label: '구분',
    value: 'title',
  },
  {
    label: '카테고리',
    value: 'upperSeq',
  },
  {
    label: '사용여부',
    value: 'useYn',
  },
];
export const useYn = [
  {
    label: '사용',
    value: 'Y',
  },
  {
    label: '미사용',
    value: 'N',
  },
];
