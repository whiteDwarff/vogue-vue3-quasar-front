import { defineStore } from 'pinia';

export const useSystemStore = defineStore('system', () => {
  const isSystemState = computed(
    () => !!system.value.permission.length && !!system.value.category.length,
  );

  const system = ref({
    permission: [],
    category: [],
  });

  const category = ref({
    menu: [],
    tree: [], // 카테고리를 트리 형식으로 저장 ( root > NOTICE )
    parent: [], // depth가 1인 카테고리만 저장  (key, label, seq)
    children: [], // depth가 2인 카테고리만 저장 (key, label, seq)
  });

  const setSystems = ({ permission }, category) => {
    system.value.permission = permission;
    system.value.category = category;
  };

  const setPermission = ({ permission }) => {
    system.value.permission = permission;
  };

  const setCategory = ({ list }) => {
    category.value.menu = setMenuList(list.category);
    category.value.tree = list.tree;
    category.value.parent = list.parents;
    category.value.children = list.children;

    system.value.category = category;
  };
  // -------------------------------------------------------------------
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

  return {
    isSystemState,
    system,
    category,
    setSystems,
    setPermission,
    setCategory,
    setMenuList,
  };
});
