import { clientCredentials } from '../client';

const getBangazonOrderProducts = (uid = '') => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/orderproducts`, {
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

export default getBangazonOrderProducts;
