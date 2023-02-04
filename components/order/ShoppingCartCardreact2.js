// import React, { useEffect, useState } from 'react';
// import DeleteIcon from '@mui/icons-material/Delete';
// import {
//   Table, TableBody, TableCell, TableRow, TableHead, Button, Select, FormControl, MenuItem,
// } from '@mui/material';
// import PropTypes from 'prop-types';
// import { useRouter } from 'next/router';
// import { updateOrder } from '../../utils/data/orderData';
// import { getPayment } from '../../utils/data/paymentData';
// import { useAuth } from '../../utils/context/authContext';

// const ShoppingCart = ({ orderProductObj, handleDecrement, handleIncrement, handleDelete }) => {
//   const [payments, setPayments] = useState([]);
//   const { user } = useAuth();
//   const [selectedPaymentMethod, setSelectedPaymentMethod] = useState({});
//   const router = useRouter();
//   const total = orderProductObj.reduce((acc, orderProduct) => acc + orderProduct.product.price * orderProduct.quantity, 0);

//   useEffect(() => {
//     getPayment(user.id)
//       .then((response) => setPayments(response));
//   }, [user]);

//   const handleCheckOut = () => {
//     orderProductObj.forEach((order) => {
//       updateOrder(order.order.id, {
//         completed: true,
//         paymentMethod: selectedPaymentMethod.id,
//         products: [
//           {
//             id: order.product.id,
//             quantity: order.quantity,
//           },
//         ],
//       }).then(() => router.push('/'));
//     });
//   };

//   return (
//     <>
//       {orderProductObj.length ? (
//         <>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell align="center">
//                   <b>Product</b>
//                 </TableCell>
//                 <TableCell align="center">
//                   <b>Quantity</b>
//                 </TableCell>
//                 <TableCell align="right">
//                   <b>Price</b>
//                 </TableCell>
//                 <TableCell />
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {orderProductObj.map(({ product, order, quantity }) => (
//                 <TableRow key={product.id}>
//                   <TableCell>
//                     <img src={product.image} alt={product.title} width={100} height={100} />
//                     {product.title}
//                   </TableCell>
//                   <TableCell align="center">
//                     <Button onClick={() => handleDecrement(product.id)}>-</Button>
//                     {quantity}
//                     <Button onClick={() => handleIncrement(product.id)}>+</Button>
//                   </TableCell>
//                   <TableCell align="right">
//                     {product.price} {quantity > 1 ? 'each' : ''}
//                   </TableCell>
//                   <TableCell align="center">
//                     <Button color="error" size="small" fontSize="small" onClick={() => handleDelete(order.id)}></Button>
//                       <

// ShoppingCart.propTypes = {
//   orderProductObj: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.number,
//       product: PropTypes.shape({
//         id: PropTypes.number,
//         title: PropTypes.string,
//         description: PropTypes.string,
//         price: PropTypes.number,
//         seller: PropTypes.string,
//         imageUrl: PropTypes.string,
//         quantityAvailable: PropTypes.number,
//       }),
//       order: PropTypes.shape({
//         id: PropTypes.number,
//         dateCreated: PropTypes.string,
//         completed: PropTypes.bool,
//         totalCost: PropTypes.number,
//         quantity: PropTypes.number,
//         customer: PropTypes.number,
//         paymentTypes: PropTypes.number,
//         products: PropTypes.arrayOf(PropTypes.number),
//       }),
//       // quantity: PropTypes.number,
//     }),
//   ).isRequired,
//   handleDecrement: PropTypes.func.isRequired,
//   handleIncrement: PropTypes.func.isRequired,
//   handleDelete: PropTypes.func.isRequired,
// };
