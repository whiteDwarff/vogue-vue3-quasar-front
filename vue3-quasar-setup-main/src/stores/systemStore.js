import { defineStore } from 'pinia';

export const useSystemStore = defineStore('system', () => {
  const isSystemState = computed(
    () => !!system.value.permission && !!system.value.category,
  );

  const system = ref({
    permission: null,
    category: null,
  });

  const setSystems = ({ permission, category }) => {
    system.value.permission = permission;
    system.value.category = category;
  };

  const setPermission = ({ permission }) => {
    system.value.permission = permission;
  };

  const setCategory = ({ category }) => {
    system.value.category = category;
  };
  // -------------------------------------------------------------------
  const categorySelectMenu = () => {
    const arr = [];

    for (let item of system.value.category) {
      arr.push({
        value: item.seq,
        label: item.name,
        depth: item.depth,
        url: item.url,
      });
    }
    return arr;
  };

  return {
    isSystemState,
    system,
    setSystems,
    setPermission,
    setCategory,
    categorySelectMenu,
  };
});
