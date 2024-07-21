import { defineStore } from 'pinia';

export const useSystemStore = defineStore('system', () => {
  const permission = ref([]); // 사용자의 권한 저장

  const category = ref({
    menu: [], // 기본 카테고리 ( aside )
    tree: [], // 카테고리를 트리 형식으로 저장 ( root > NOTICE )
    parent: [], // depth가 1인 카테고리만 저장  (key, label, seq)
    children: [], // depth가 2인 카테고리만 저장 (key, label, seq)
  });

  const loadingState = ref(false); // 로딩상태

  // State -----------------------------------------------------------

  // permission이 store에 존재하는지 true : false
  const isPermission = computed(() => permission.value.length > 0);
  // category가 store에 존재하는지 true : false
  const isCategory = computed(() => !!category.value.menu);

  // Setter -----------------------------------------------------------

  // permission, category를 store에 저장
  const setSystem = (data) => {
    category.value.menu = data.menu;
    category.value.tree = data.tree;
    category.value.parent = data.parent;
    category.value.children = data.children;
    permission.value = data.permission;
  };

  // category 등록 및 수정 후 store에 다시 저장
  const setCategory = ({ list }) => {
    category.value.menu = setMenuList(list.category);
    category.value.menu = list.category;
    category.value.tree = list.tree;
    category.value.parent = list.parent;
    category.value.children = list.children;
  };
  // Utill -------------------------------------------------------------
  const setMenuList = (categorys) => {
    if (categorys) {
      for (let item of categorys) {
        const childrens = JSON.parse(item.midCategory);
        const arr = [];

        for (let children of childrens)
          if (item.seq == children.upperSeq) arr.push(children);

        item.midCategory = [...arr];
      }
    }
    return categorys || [];
  };
  // 관리자 > 카테고리 관리 > 접근관리 및 CRUD 상태 셋팅 (접근권한, 등록, 수정, 삭제)
  const basePermission = () => {
    let arr = [];
    for (let item of permission.value) {
      let obj = {
        idntfCd: item.idntfCd,
        idntfNm: item.idntfNm,
        access: 'Y',
        add: null,
        update: null,
        delete: null,
      };
      arr.push(obj);
    }
    return arr;
  };

  const setLowerCategory = (seq) => {
    const arr = [];

    for (let item of category.value.children) {
      if (item.upperSeq == seq) arr.push(item);
    }
    return arr;
  };
  const setAuthDetail = (idntfCd) => {
    return permission.value.find((item) => item.idntfCd == idntfCd);
  };
  // 파라미터로 들어온 seq와 children의 upperSeq가 동일한 서브 카테고리 반환
  const selectByUpperCategory = (seq) => {
    return category.value.children.filter((data) => data.upperSeq == seq);
  };
  // 파라미터로 들어온 seq와 children의 value가 같다면 말머리 반환
  const selectByprepend = ({ upperSeq, lowerSeq }) => {
    for (let parent of category.value.menu) {
      if (parent.seq == upperSeq) {
        for (let child of parent.midCategory) {
          if (child.seq == lowerSeq) {
            return child;
          }
        }
      }
    }
  };
  //게시판 카테고리만 반환
  const getPostCategory = () => {
    return category.value.parent.filter((data) => data.postYn == 'Y');
  };

  const updateLoadingState = () => (loadingState.value = !loadingState.value);

  return {
    permission,
    category,
    isPermission,
    isCategory,
    setSystem,
    setCategory,
    setMenuList,
    basePermission,
    setLowerCategory,
    setAuthDetail,
    selectByUpperCategory,
    selectByprepend,
    getPostCategory,
    loadingState,
    updateLoadingState,
  };
});
