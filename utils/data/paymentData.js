import { clientCredentials } from '../client';

const getPayment = (uid = '') => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/paymenttypes`, {
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

const getSinglePaymentType = (paymentTypeId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/paymenttypes/${paymentTypeId}`)
    .then((response) => response.json())
    .then((data) => {
      resolve({
        id: data.id,
        accountNumber: data.account_number,
        paymentName: data.payment_name,
      });
    })
    .catch(reject);
});

const createPaymentType = (user, paymentType) => new Promise((resolve, reject) => {
  const paymentTypeObj = {
    account_number: Number(paymentType.accountNumber),
  };
  fetch(`${clientCredentials.databaseURL}/paymenttypes`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(paymentTypeObj),
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

export { getPayment, getSinglePaymentType, createPaymentType };
