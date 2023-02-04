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

// const activeOrdersByCustomer = (customerId) => new Promise((resolve, reject) => {
//   fetch(`${clientCredentials.databaseURL}/orderByCustomer/${customerId}`)
//     .then((response) => response.json())
//     .then((data) => {
//       resolve({
//         id: data.id,
//         customer: data.customer,
//         order: data.order,
//         product: data.product,
//       });
//     })
//     .catch((error) => reject(error));
// });

const activeOrdersByCustomer = (customerId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/orders?completed=False&customer=${customerId}`)
    .then((response) => response.json())
    .then((data) => {
      resolve({
        id: data.id,
        customer: data.customer,
        order: data.order,
        product: data.product,
      });
    })
    .catch((error) => reject(error));
});

const updateOrderProduct = (orderProductId, orderProduct) => new Promise((resolve, reject) => {
  const orderProductObj = {
    product: orderProduct.product,
    customer: orderProduct.customer,
    order: orderProduct.order,
  };
  fetch(`${clientCredentials.databaseURL}/orderproducts/${orderProductId}`, {
    method: 'PUT',
    body: JSON.stringify(orderProductObj),
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => resolve(response))
    .catch(reject);
});

const deleteOrderProduct = (orderProductId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/orderproducts/${orderProductId}`, {
    method: 'DELETE',
  })
    .then(resolve)
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

export {
  getBangazonOrderProducts, activeOrdersByCustomer, updateOrderProduct, deleteOrderProduct,
};
// getOrderDetails,
