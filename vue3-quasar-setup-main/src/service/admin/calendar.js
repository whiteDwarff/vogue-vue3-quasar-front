import { useAuthStore } from 'src/stores/authStore';
import { storeToRefs } from 'pinia';

export async function getScheduleList({ start, end }) {
  try {
    return await api.get(`/schedule/get?start=${start}&end=${end}`);
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
  console.log('----------');
  console.log(data);
  console.log('----------');

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
