import { defineStore } from 'pinia';

export const useSystemStore = defineStore('system', () => {
  const isSystemState = computed(
    () => !!system.value.permission.length && !!system.value.category.length,
  );

  const system = ref({
    permission: [],
    category: [],
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
  const sortCategories = (category) => {
    for (let item of category) {
      const childrens = JSON.parse(item.midCategory);
      const arr = [];
      for (let children of childrens)
        if (item.seq == children.upperSeq) arr.push(children);
      item.midCategory = [...arr];
    }

    return category;
  };

  return {
    isSystemState,
    system,
    setSystems,
    setPermission,
    setCategory,
    sortCategories,
  };
});
