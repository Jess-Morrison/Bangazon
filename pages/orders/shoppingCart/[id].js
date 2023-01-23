// /* eslint-disable react-hooks/exhaustive-deps */
// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
// // import { Button } from 'react-bootstrap';
// import ProductCard from '../../../components/product/ProductCard';
// // import { getBangazonProducts } from '../../utils/data/productData';
// // import { getBangazonOrders } from '../../../utils/data/orderData';
// import getBangazonOrderProducts from '../../../utils/data/orderProductData';
// import { useAuth } from '../../../utils/context/authContext';

// function ShoppingCart() {
//   const [products, setProducts] = useState([]);
//   const [orders, setOrders] = useState([]);
//   // const router = useRouter();
//   const { user } = useAuth();
//   const { id } = useRouter();

//   const getProducts = () => {
//     getBangazonOrderProducts(id).then(setProducts);
//   };
//   // console.warn(products.completed);
//   // Keep getting undefined, is this because I am trying to dot notate on a object?
//   console.warn(products);

//   useEffect(() => {
//     getProducts();
//   }, []);

//   const getOrders = () => {
//     const eachOrder = [];

//     products.forEach((order) => {
//       const orderProduct = order?.id;
//       if (orderProduct && !eachOrder.includes(orderProduct)) {
//         eachOrder.push(orderProduct);
//       }
//       setOrders(eachOrder);
//     });
//     // console.warn(eachOrder);
//   };
//   getOrders();

//   // ((order) => (order.id === null))).map((filteredOrders)
//   if (orders.customer === user.id) {
//     return (
//       <>
//         <article className="posts">
//           <h1>Shopping Cart</h1>
//           {() => (
//           // console.warn(filteredProducts),

//             <section key={`${eachProduct.order.id}`} className="post">
//               <ProductCard
//                 id={eachProduct.order.id}
//                 seller={eachProduct.product.seller}
//                 price={eachProduct.product.price}
//                 title={eachProduct.product.title}
//                 imageUrl={eachProduct.product.image_url}
//                 description={eachProduct.product.description}
//                 quantity={eachProduct.quantity}
//                 onUpdate={getBangazonOrderProducts}
//               />
//               {/* <Button
//               onClick={() => {
//                 AddProduct(filteredOrders.id, user.uid).then(getContent());
//               }}
//             >
//               Purchase
//             </Button> */}
//             </section>
//           )}
//         </article>
//       </>
//     );
//   }
// }

// export default ShoppingCart;
