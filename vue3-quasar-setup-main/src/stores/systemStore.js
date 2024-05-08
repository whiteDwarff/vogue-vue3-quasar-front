import { defineStore } from 'pinia';

export const useSystemStore = defineStore('system', () => {
  const permission = ref([]); // 사용자의 권한 저장

  const category = ref({
    menu: [], // 기본 카테고리 ( aside )
    tree: [], // 카테고리를 트리 형식으로 저장 ( root > NOTICE )
    parent: [], // depth가 1인 카테고리만 저장  (key, label, seq)
    children: [], // depth가 2인 카테고리만 저장 (key, label, seq)
  });

  // state
  const isPermission = computed(() => !!permission.value);
  const isCategory = computed(() => !!category.value.menu);

  // Setter -----------------------------------------------------------
  const setSystem = ({ list }) => {
    permission.value = list.permission;
    category.value.menu = setMenuList(list.category);
    category.value.menu = list.category;
    category.value.tree = list.tree;
    category.value.parent = list.parent;
    category.value.children = list.children;
  };

  const setPermission = ({ permission }) => {
    permission.value = permission;
  };

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

  const basePermission = () => {
    let arr = [];
    for (let item of permission.value) {
      let obj = {
        idntfCd: item.idntfCd,
        idntfNm: item.idntfNm,
        access: 'Y',
        add: 'Y',
        update: 'Y',
        delete: 'Y',
      };
      arr.push(obj);
    }
    return arr;
  };

  const setUpperSeq = () => {
    return category.value.parent[0]?.value;
  };
  const setLowerCategory = (seq) => {
    const arr = [];

    for (let item of category.value.children) {
      if (item.upperSeq == seq) arr.push(item);
    }
    return arr;
  };

  return {
    permission,
    category,
    isPermission,
    isCategory,
    setSystem,
    setPermission,
    setCategory,
    setMenuList,
    basePermission,
    setUpperSeq,
    setLowerCategory,
  };
});
