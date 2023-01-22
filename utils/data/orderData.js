import { clientCredentials } from '../client';

const getBangazonOrders = (uid = '') => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/orders`, {
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

const getOrderByUser = (id, uid = '') => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/products?orderBy="seller"&equalTo${id}`, {
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

const getOrderById = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/orders/${id}`)
    .then((response) => response.json())
    .then((data) => {
      resolve({
        id: data.id,
        customer: data.customer,
        totalCost: data.total_cost,
        title: data.title,
        dateCreated: data.date_created,
        completed: data.completed,
        quantity: data.quantity,
      });
    })
    .catch(reject);
});

const createOrder = (user, post) => new Promise((resolve, reject) => {
  const orderObj = {
    id: post.id,
    customer: post.customer,
    totalCost: post.total_cost,
    title: post.title,
    dateCreated: post.date_created,
    completed: post.completed,
    quantity: post.quantity,
  };
  fetch(`${clientCredentials.databaseURL}/orders`, {
    method: 'POST',
    body: JSON.stringify(orderObj),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((resp) => resolve(resp.json()))
    .catch((error) => reject(error));
});

const updateOrder = (user, put, id) => new Promise((resolve, reject) => {
  const orderObj = {
    // id: put.id,
    id: put.id,
    customer: put.customer,
    totalCost: put.total_cost,
    title: put.title,
    dateCreated: put.date_created,
    completed: put.completed,
    quantity: put.quantity,
  };
  fetch(`${clientCredentials.databaseURL}/orders/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderObj),
  })
    .then((response) => resolve(response.data))
    .catch(reject);
});

const AddProduct = (productId, uid) => new Promise((resolve, reject) => {
  // TODO: Write the POST fetch request to join and event
  // console.warn(uid);
  fetch(`${clientCredentials.databaseURL}/orders/${productId}/purchase`, {
    method: 'POST',
    body: JSON.stringify({ uid }),
    headers: {
      // Authorization: uid, // This is how to pass the uid
      'Content-Type': 'application/json',
      // Accept: 'application/json',
    },
    // uid,
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

const RemoveProduct = (productId, uid) => new Promise((resolve, reject) => {
  // TODO: Write the DELETE fetch request to leave an event
  fetch(`${clientCredentials.databaseURL}/orders/${productId}/remove`,
    {
      method: 'DELETE',
      body: JSON.stringify(uid),
      headers: {
        // Authorization: uid, // This is how to pass the uid
        'Content-Type': 'application/json',
      },

    })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

export {
  getBangazonOrders, updateOrder, createOrder, getOrderById, getOrderByUser, AddProduct, RemoveProduct,
};
