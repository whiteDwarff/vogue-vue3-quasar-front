export async function getScheduleList({ start, end }) {
  try {
    return await api.get(`/schedule/get?start=${start}&end=${end}`);
  } catch (err) {
    console.log(err);
    getErrorMessage(err.response);
  }
}

export async function registerModify(form) {
  try {
    if (!form.id) return await api.post('/schedule/insert', form);

    return await api.patch('/schedule/update', form);
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
