// import React, { useEffect, useState } from 'react';
// import { Table, Button, Select, FormControl, MenuItem } from 'react-bootstrap';
// import DeleteIcon from '@mui/icons-material/Delete';
// import PropTypes from 'prop-types';
// import { useRouter } from 'next/router';
// import { updateOrder } from '../../utils/data/orderData';
// import { getPayment } from '../../utils/data/paymentData';
// import { useAuth } from '../../utils/context/authContext';

// const ShoppingCart = ({ orderProductObj, handleDecrement, handleIncrement, handleDelete }) => {
//   const total = orderProductObj.length ? orderProductObj.reduce((acc, orderProduct) => acc + orderProduct.product.price * orderProduct.quantity, 0) : 0;
//   const [payments, setPayments] = useState([]);
//   const { user } = useAuth();
//   const [selectedPaymentMethod, setSelectedPaymentMethod] = useState({});
//   const router = useRouter();

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
//           <div>
//             <Table striped bordered hover>
//               <thead>
//                 <tr>
//                   <th align="center">Product</th>
//                   <th align="center">Quantity</th>
//                   <th align="right">Price</th>
//                   <th />
//                 </tr>
//               </thead>
//               <tbody>
//                 {orderProductObj.map(({ product, quantity }) => (
//                   <tr key={product.id}>
//                     <td>
//                       <img src={product.image} alt={product.title} width={100} height={100} />
//                       {product.title}
//                     </td>
//                     <td align="center">
//                       <Button onClick={() => handleDecrement(product.id)}>-</Button>
//                       {quantity}
//                       <Button onClick={() => handleIncrement(product.id)}>+</Button>
//                     </td>
//                     <td align="right">
//                       {product.price} {quantity > 1 ? 'each' : ''}
//                     </td>
//                     <td align="center">
//                       <Button variant="danger" size="sm" onClick={() => handleDelete(orderProductObj[0].id)}>
//                         <DeleteIcon />
//                       </Button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </Table>
//           </div>
//           <div style={{ display: 'flex', justifyContent: 'flex-end'}}>

//       ) : (
//         <div style={{
//           display: 'flex', justifyContent: 'center', margin: '10px', flexWrap: 'wrap',
//         }}
//         >
//           <h2>Cart is Empty</h2>
//           <Button variant="outlined" color="success" onClick={() => router.push('/product')}>Continue Shopping?</Button>
//         </div>
//       )}
//     </>
//   );
// }
