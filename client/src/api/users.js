import axios from 'axios';

export const getUsersRequest = async () => await axios.get('/api/users');

export const getUserRequest = async (id) => await axios.get('/api/users/' + id);

export const deleteUserRequest = async (id) =>
  await axios.delete('/api/users/' + id);

export const createUserRequest = async (user) => {
  const form = new FormData();
  for (let key in user) {
    // console.log('key', key);
    // console.log('post', post);
    // console.log('post[key]', post[key]);
    form.append(key, user[key]);
  }
  return await axios.post('/api/users', form, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const updateUserRequest = async (id, newUserFields) => {
  const form = new FormData();
  for (let key in newUserFields) {
    form.append(key, newUserFields[key]);
  }
  return axios.put('/api/users/' + id, form, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
