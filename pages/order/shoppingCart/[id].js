/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
// import { Button } from 'react-bootstrap';
import ProductCard from '../../../components/product/ProductCard';
import { getProductByOrderId } from '../../../utils/data/productData';
// import { getBangazonOrders } from '../../../utils/data/orderData';
// import getOrderById from '../../../utils/data/orderProductData';
// import { getProductByOrderId } from '../../../utils/data/productData';
// import { useAuth } from '../../../utils/context/authContext';

function ShoppingCart() {
  const [orderProducts, setOrderProducts] = useState([]);
  // const [orders, setOrders] = useState([]);
  // const router = useRouter();
  // const { user } = useAuth();
  const { id } = useRouter();

  const getProducts = () => {
    getProductByOrderId(id).then(setOrderProducts);
  };
  // console.warn(orderProducts);
  // Keep getting undefined, is this because I am trying to dot notate on a object?
  // console.warn(products);

  useEffect(() => {
    getProducts();
  }, []);

  // const getOrders = () => {
  //   const eachOrder = [];

  //   products.forEach((order) => {
  //     const orderProduct = order?.id;
  //     if (orderProduct && !eachOrder.includes(orderProduct)) {
  //       eachOrder.push(orderProduct);
  //     }
  //     setOrders(eachOrder);
  //   });
  //   // console.warn(eachOrder);
  // };
  // getOrders();

  // ((order) => (order.id === null))).map((filteredOrders)
  // if (orders.customer === user.id) {
  return (
    <>
      <article className="posts">
        <h1>Shopping Cart</h1>
        {orderProducts.map((filteredOrderProducts) => (
          // console.warn(filteredProducts),

          <section key={`${console.warn(filteredOrderProducts.order_id)}`} className="post">
            <ProductCard
              id={filteredOrderProducts.id}
              // order={filteredOrderProducts.product.order}
              // orderProducts={filteredOrderProducts.product.order_products}
              seller={filteredOrderProducts.seller.first_name}
              price={filteredOrderProducts.price}
              title={filteredOrderProducts.title}
              imageUrl={filteredOrderProducts.image_url}
              description={filteredOrderProducts.description}
              quantityAvailable={filteredOrderProducts.quantity_available}
              onUpdate={getProductByOrderId}
            />
            {/* <Button
                        onClick={() => {
                AddProduct(filteredOrders.id, user.uid).then(getContent());
              }}
            >
              Purchase
            </Button> */}
          </section>
        ))}
      </article>
    </>
  );
}
// }

export default ShoppingCart;
