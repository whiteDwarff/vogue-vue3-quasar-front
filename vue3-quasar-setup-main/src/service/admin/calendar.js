import { useAuthStore } from 'src/stores/authStore';
import { storeToRefs } from 'pinia';

export async function getScheduleList(day) {
  console.log(day);
  try {
    return await api.post('/admin/schedule/get', day);
  } catch (err) {
    console.log(err);
    getErrorMessage(err.response);
  }
}

export async function getSchedule({ id }) {
  try {
    return await api.post('/admin/schedule/selectOne', { id });
  } catch (err) {
    console.log(err);
    getErrorMessage(err.response);
  }
}

export async function saveSchedule(form) {
  const authStore = useAuthStore();
  const { user } = storeToRefs(authStore);

  const data = {
    ...form,
    author: user.value.seq,
  };

  try {
    return await api.post('/admin/schedule/save', data);
  } catch (err) {
    console.log(err);
    getErrorMessage(err.response);
  }
}

export async function deleteSchedule(id) {
  try {
    return await api.delete(`/schedule/delete?id=${id}`);
  } catch (err) {
    console.log(err);
    getErrorMessage(err.response);
  }
}
