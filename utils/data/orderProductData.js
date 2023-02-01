import { clientCredentials } from '../client';
// import { getProductById } from './productData';

const getBangazonOrderProducts = (id, uid) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/order/${id}`,
    {
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

// const getBangazonOrderProducts = (orderId) => new Promise((resolve, reject) => {
//   fetch(`${clientCredentials.databaseURL}/orders/shoppingCart/${orderId}`)
//     .then((response) => response.json())
//     .then((data) => {
//       resolve({
//         orderId: data.order_id,
//       });
//     })
//     .catch(reject);
// });

// const getOrderDetails = (productId, orderId) => new Promise((resolve, reject) => {
//   getProductById(productId)
//     .then((productData) => {
//       getBangazonOrderProducts(orderId)
//         .then((orderData) => {
//           resolve({ productData, orderData });
//         });
//     }).catch((error) => reject(error));
// });

export default getBangazonOrderProducts;
// getOrderDetails,
