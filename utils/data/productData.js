import { clientCredentials } from '../client';

const getBangazonProducts = (uid = '') => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/products`, {
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

const getProductsBySeller = (seller, uid = '') => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/products?orderBy=seller&equalTo${seller}`, {
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

const getProductById = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/products/${id}`)
    .then((response) => response.json())
    .then((data) => {
      resolve({
        id: data.id,
        seller: data.seller,
        price: data.price,
        title: data.title,
        description: data.description,
        imageUrl: data.image_url,
        quantityAvailable: data.quantity_available,
      });
    })
    .catch(reject);
});

// eslint-disable-next-line camelcase
const getProductByOrderId = (id) => new Promise((resolve, reject) => {
  // if (product.order === `${id}`) {
  // eslint-disable-next-line camelcase
  fetch(`${clientCredentials.databaseURL}/product/${id}`)
    .then((response) => response.json())
    .then((data) => {
      // if (data.product.order === `${id}`) {
      resolve({
        id: data.id,
        seller: data.seller,
        price: data.price,
        title: data.title,
        description: data.description,
        imageUrl: data.image_url,
        quantityAvailable: data.quantity_available,
      });
      // } else {
      //   throw new Error('Unable to fetch data.');
      // }
    })
    .catch(reject);
  // }
});

const createProduct = (post) => new Promise((resolve, reject) => {
  const productObj = {
    id: post.id,
    seller: post.seller,
    price: post.price,
    title: post.title,
    description: post.description,
    imageUrl: post.image_url,
    quantityAvailable: post.quantity_available,
  };
  fetch(`${clientCredentials.databaseURL}/products`, {
    method: 'POST',
    body: JSON.stringify(productObj),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((resp) => resolve(resp.json()))
    .catch((error) => reject(error));
});

// const createProduct = (product) => new Promise((resolve, reject) => {
//   fetch(`${clientCredentials.databaseURL}/products`, {
//     method: 'POST',
//     body: JSON.stringify(product),
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   })
//     .then((resp) => resolve(resp.json()))
//     .catch((error) => reject(error));
// });

const updateProduct = (user, put, id) => new Promise((resolve, reject) => {
  const productObj = {
    // id: put.id,
    id: put.id,
    seller: put.seller,
    price: put.price,
    title: put.title,
    description: put.description,
    imageUrl: put.image_url,
    quantityAvailable: put.quantity_available,
  };
  fetch(`${clientCredentials.databaseURL}/products/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(productObj),
  })
    .then((response) => resolve(response.data))
    .catch(reject);
});

const deleteProduct = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/products/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

// eslint-disable-next-line import/prefer-default-export
export {
  getBangazonProducts, deleteProduct, updateProduct, getProductByOrderId, createProduct, getProductById, getProductsBySeller,
};
