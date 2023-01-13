import { clientCredentials } from '../client';

const getBangazonUsers = (uid = '') => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/user`, {
    method: 'GET',
    headers: {
      Authorization: uid,
    },
  })
    .then((response) => (response.status === 200 ? response : false))
    .then((response) => {
      if (response) {
        resolve(response.json());
      } else {
        throw new Error('403 response from server');
      }
    })
    .catch(reject);
});

const getUserById = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/user/${id}`)
    .then((response) => response.json())
    .then((data) => {
      resolve({
        id: data.id,
        uid: data.uid,
        firstName: data.first_name,
        lastName: data.last_name,
        imageUrl: data.image_url,
        createdOn: data.created_on,
      });
    })
    .catch(reject);
});

const createUser = (user, post) => new Promise((resolve, reject) => {
  const userObj = {
    uid: user.uid,
    firstName: post.first_name,
    lastName: post.last_name,
    image_url: post.image_url,
    createdOn: post.acreated_on,
  };
  fetch(`${clientCredentials.databaseURL}/user`, {
    method: 'POST',
    body: JSON.stringify(userObj),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((resp) => resolve(resp.json()))
    .catch((error) => reject(error));
});

const updateUser = (user, put, id) => new Promise((resolve, reject) => {
  const userObj = {
    id: put.id,
    uid: put.uid,
    firstName: put.first_name,
    lastName: put.last_name,
    image_url: put.image_url,
    createdOn: put.created_on,
  };
  fetch(`${clientCredentials.databaseURL}/user/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userObj),
  })
    .then((response) => resolve(response.data))
    .catch(reject);
});

const deleteUser = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/user/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

// eslint-disable-next-line import/prefer-default-export
export {
  getBangazonUsers, deleteUser, updateUser, createUser, getUserById,
};
