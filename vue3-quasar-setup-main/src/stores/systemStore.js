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
    tree: [], // 카테고리를 트리 형식으로 저장 ( root > NOTICE )
    parents: [], // depth가 1인 카테고리만 저장  (key, label, seq)
    children: [], // depth가 2인 카테고리만 저장 (key, label, seq)
  });

  const setSystems = ({ permission }, category) => {
    system.value.permission = permission;
    system.value.category = category;
  };

  const setPermission = ({ permission }) => {
    system.value.permission = permission;
  };

  const setCategory = (category) => {
    system.value.category = category;
  };
  // -------------------------------------------------------------------
  const sortCategories = (categorys) => {
    if (categorys) {
      for (let item of categorys) {
        // parents 저장
        category.value.parents.push({
          label: item.name,
          value: item.seq,
        });

        const childrens = JSON.parse(item.midCategory);
        const arr = [];

        for (let children of childrens) {
          if (item.seq == children.upperSeq) {
            // children 저장
            category.value.children.push({
              label: children.name,
              value: children.seq,
              upperSeq: item.seq,
            });
            arr.push(children);
          }
        }
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
    sortCategories,
  };
});
