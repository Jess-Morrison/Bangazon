/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// import Link from 'next/link';
import { Button, Form } from 'react-bootstrap';
import { useRouter } from 'next/router';
// import { useAuth } from '../../utils/context/authContext';
import { getPayment } from '../../utils/data/paymentData';
import { createOrder, updateOrder } from '../../utils/data/orderData';

const initialState = {
  id: null,
  customer: '',
  paymentTypes: '',
  totalCost: 0,
  dateCreated: '',
  completed: false,
  quantity: 0,
};

const OrderForm = ({ orderObj }) => {
  const [order, setOrder] = useState(initialState);
  const [paymentTypes, setPaymentTypes] = useState([]);
  const router = useRouter();

  useEffect((id) => {
    getPayment(id).then(setPaymentTypes);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrder((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (orderObj.id) {
      updateOrder(order, orderObj.id).then((id) => router.push(`/order/ShoppingCart/${id}`));
    } else {
      createOrder(order).then((id) => router.push(`/order/ShoppingCart/${id}`));
    }
  };

  const getAndSet = () => {
    if (orderObj.id) {
      setOrder(orderObj);
    }
  };
  useEffect(() => {
    getAndSet();
  }, [orderObj]);

  let total = 0;
  if (order.length) {
    order.forEach((orderproduct) => {
      total += Number(orderproduct.price);
    });
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Your Order</Form.Label>
          <Form.Control name="customer" required value={order.customer} onChange={handleChange} />
          <Form.Label>Date Created</Form.Label>
          <Form.Control name="dateCreated" type="date" required value={order.dateCreated} onChange={handleChange} />
          <Form.Label>Quanity</Form.Label>
          <Form.Control name="imageUrl" required value={order.quantity} onChange={handleChange} />
          <Form.Label>Post Content</Form.Label>
          <Form.Control name="totalCost" required value={total} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Select Payment Method</Form.Label>
          <Form.Select
            name="paymentTypes"
            onChange={handleChange}
            className="mb-3"
            value={order.paymentTypes?.id}
            required
          >
            <option value="">Select payment</option>
            {paymentTypes.map((paymentType) => (
              <option
                defaultValue={paymentType.id === order.paymentType}
                key={paymentType.id}
                value={paymentType.id}
              >
                {paymentType.label}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Button variant="primary" type="submit">
          Order?
        </Button>
      </Form>
    </>
  );
};

OrderForm.propTypes = {
  orderObj: PropTypes.shape({
    id: PropTypes.number,
    customer: PropTypes.string,
    paymentTypes: PropTypes.string,
    totalCost: PropTypes.number,
    dateCreated: PropTypes.string,
    completed: PropTypes.bool,
    quantity: PropTypes.number,
  }),
};

OrderForm.defaultProps = {
  orderObj: initialState,
};

export default OrderForm;
