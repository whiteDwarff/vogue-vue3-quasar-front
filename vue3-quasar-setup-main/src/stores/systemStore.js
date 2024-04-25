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
  const categorySelectMenu = () => {
    const arr = [
      {
        value: '1',
        label: 'root',
        depth: 0,
        url: '/',
      },
    ];

    for (let item of system.value.category) {
      arr.push({
        value: item.seq,
        label: `${arr[0].label} > ${item.name}`,
        depth: item.depth,
        url: item.url,
      });
    }
    return arr;
  };

  // 사옹자 권한별 체크박스 셋팅
  const addUserPermission = () => {
    const basket = [];
    for (let item of system.value.permission) {
      const obj = {
        idntfCd: item.idntfCd,
        value: item.idntfNm,
        access: 'Y',
        add: 'Y',
        update: 'Y',
        delete: 'Y',
      };
      basket.push(obj);
    }
    return basket;
  };
  return {
    isSystemState,
    system,
    setSystems,
    setPermission,
    setCategory,
    categorySelectMenu,
    addUserPermission,
  };
});
