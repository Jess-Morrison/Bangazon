import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Button, Form } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useAuth } from '../../utils/context/authContext';
import { getPayment } from '../../utils/data/paymentData';
import { createOrder } from '../../utils/data/orderData';

function OrderForm1({ cartItemIds, cartItems }) {
  const [paymentTypes, setPaymentTypes] = useState([]);
  const { user } = useAuth();
  const router = useRouter();
  const [formInput, setFormInput] = useState({
    paymentType: {
      id: 0,
      paymentName: '',
      accountNumber: 0,
    },
  });
  let total = 0;
  if (cartItems.length) {
    cartItems.forEach((product) => {
      total += Number(product.price);
    });
  }

  useEffect(() => {
    getPayment(user.id).then(setPaymentTypes);
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createOrder(user, cartItemIds, total, formInput).then(() => {
      router.replace(`/users/${user.id}`);
    });
  };

  return (
    <aside className="col-2">
      <h3>Your Order</h3>
      <h3>Total: ${total}</h3>
      <Form onSubmit={handleSubmit} id={total}>
        {paymentTypes ? (
          <>
            <Form.Group className="mb-3">
              <Form.Label>Select Payment Method</Form.Label>
              <Form.Select
                name="paymentType"
                onChange={handleChange}
                className="mb-3"
                value={formInput.paymentType?.id}
                required
              >
                <option value="">Select payment</option>
                {paymentTypes.map((paymentType) => (
                  <option
                    defaultValue={paymentType.id === formInput.paymentType}
                    key={paymentType.id}
                    value={paymentType.id}
                  >
                    {paymentType.label}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Button variant="warning" type="submit">
              Place Order
            </Button>
          </>
        ) : (
          <>
            <p>Please Add Payment Method</p>
            <Link href="/paymentTypes/new" passHref>
              <Button variant="success">Add</Button>
            </Link>
          </>
        )}
      </Form>
    </aside>
  );
}

OrderForm1.propTypes = {
  cartItemIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  cartItems: PropTypes.arrayOf(PropTypes.shape({
    orderObj: PropTypes.shape({
      id: PropTypes.number,
      totalCost: PropTypes.number,
      title: PropTypes.string,
      imageUrl: PropTypes.string,
      price: PropTypes.string,
      quantity: PropTypes.number,
      seller: PropTypes.shape({
        id: PropTypes.number,
        firstName: PropTypes.string,
        lastName: PropTypes.string,
      }),
    }),
  })).isRequired,
};

export default OrderForm1;
