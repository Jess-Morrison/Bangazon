/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
// import { Button } from 'react-bootstrap';
import OrderCard from '../../components/order/MainOrderCard';
import ProductCard from '../../components/product/ProductCard';
import { getBangazonOrders } from '../../utils/data/orderData';
import { getBangazonProducts } from '../../utils/data/productData';
import { useAuth } from '../../utils/context/authContext';

function ShoppingCart() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const { user } = useAuth();

  const getOrders = () => {
    getBangazonOrders(user.uid).then(setOrders);
  };

  const getProducts = () => {
    getBangazonProducts(user.uid).then(setProducts);
  };

  useEffect(() => {
    getOrders();
    getProducts();
  }, []);

  // ((order) => (order.id === null))).map((filteredOrders)

  return (
    <>
      <article className="posts">
        <h1>Your Cart</h1>
        {orders.map((filteredOrders) => (
          <section key={`${filteredOrders.id}`} className="post">
            <OrderCard
              id={filteredOrders.id}
              customer={filteredOrders.customer.first_name}
              totalCost={filteredOrders.total_cost}
              dateCreated={filteredOrders.date_created}
              completed={filteredOrders.completed}
              quantity={filteredOrders.quantity}
              onUpdate={getBangazonOrders}
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
        {products.map((filteredProducts) => (
          <section key={`${filteredProducts.id}`} className="post">
            <ProductCard
              id={filteredProducts.id}
              seller={filteredProducts.seller.first_name}
              price={filteredProducts.price}
              title={filteredProducts.title}
              description={filteredProducts.description}
              quantity={filteredProducts.quantity}
              onUpdate={getBangazonProducts}
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

export default ShoppingCart;
