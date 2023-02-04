/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Table, TableBody, TableCell, TableRow, TableHead, Button, Select, FormControl, MenuItem,
} from '@mui/material';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { updateOrder } from '../../utils/data/orderData';
import { getPayment } from '../../utils/data/paymentData';
import { useAuth } from '../../utils/context/authContext';

// the logic is in this card

export default function ShoppingCart({
  orderProductObj, handleDecrement, handleIncrement, handleDelete,
}) {
  const total = orderProductObj && orderProductObj.length > 0 ? orderProductObj.reduce((acc, orderProduct) => acc + orderProduct.product.price * orderProduct.quantity, 0) : 0;
  // let total = 0;
  // if (order.length) {
  //   order.forEach((orderproduct) => {
  //     total += Number(orderproduct.price);
  //   });
  // }
  const [payments, setPayments] = useState([]);
  const { user } = useAuth();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState({});
  const router = useRouter();

  useEffect(() => {
    getPayment(user.id)
      .then((response) => setPayments(response));
  }, [user]);

  const handleCheckOut = () => {
    orderProductObj.forEach((order) => {
      updateOrder(order.order.id, {
        completed: true,
        paymentMethod: selectedPaymentMethod.id,
        products: [
          {
            id: order.product.id,
            quantity: order.quantity,
          },
        ],
      }).then(() => router.push('/'));
    });
  };

  return (
    <>
      {orderProductObj.length ? (
        <>
          <div>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">
                    <b>Product</b>
                  </TableCell>
                  <TableCell align="center">
                    <b>Quantity</b>
                  </TableCell>
                  <TableCell align="right">
                    <b>Price</b>
                  </TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>

              <TableBody>
                {orderProductObj.map(({ product, quantity }) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <img src={product.image} alt={product.title} width={100} height={100} />
                      {product.title}
                    </TableCell>
                    <TableCell align="center">
                      <Button onClick={() => handleDecrement(product.id)}>-</Button>
                      {quantity}
                      <Button onClick={() => handleIncrement(product.id)}>+</Button>
                    </TableCell>
                    <TableCell align="right">
                      {product.price} {quantity > 1 ? 'each' : ''}
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        color="error"
                        size="small"
                        fontSize="small"
                        onClick={() => handleDelete(product.id)}
                        // (orderProductObj[0].id)
                      >
                        <DeleteIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <TableCell align="center">
              <div style={{ justifyContent: 'flex-end' }}>
                <b>Total:</b> {total}
              </div>
              <div style={{ justifyContent: 'flex-end', margin: '15px' }}>
                <FormControl fullWidth required>
                  <Select value={selectedPaymentMethod.id} onChange={(e) => setSelectedPaymentMethod(payments.find((payment) => payment.id === e.target.value))}>
                    {payments.map((payment) => (
                      <MenuItem key={payment.id} value={payment.id}>
                        {payment.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div style={{ justifyContent: 'flex-end' }}>
                <Button variant="outlined" color="success" onClick={() => handleCheckOut()}>
                  Check Out
                </Button>
              </div>
            </TableCell>
          </div>
        </>
      ) : (
        <div style={{
          display: 'flex', justifyContent: 'center', margin: '10px', flexWrap: 'wrap',
        }}
        >
          <h2>Cart is Empty</h2>
          <Button variant="outlined" color="success" onClick={() => router.push('/product')}>Continue Shopping?</Button>
        </div>
      )}
    </>
  );
}

ShoppingCart.propTypes = {
  orderProductObj: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      product: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        description: PropTypes.string,
        price: PropTypes.number,
        seller: PropTypes.string,
        imageUrl: PropTypes.string,
        quantityAvailable: PropTypes.number,
      }),
      order: PropTypes.shape({
        id: PropTypes.number,
        dateCreated: PropTypes.string,
        completed: PropTypes.bool,
        totalCost: PropTypes.number,
        quantity: PropTypes.number,
        customer: PropTypes.number,
        paymentTypes: PropTypes.number,
        products: PropTypes.arrayOf(PropTypes.number),
      }),
      // quantity: PropTypes.number,
    }),
  ).isRequired,
  handleDecrement: PropTypes.func.isRequired,
  handleIncrement: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};
