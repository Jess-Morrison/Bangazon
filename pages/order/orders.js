/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
// import { Button } from 'react-bootstrap';
import OrderCard from '../../components/order/MainOrderCard';
import { getOrderCompletedByUser } from '../../utils/data/orderData';
import { useAuth } from '../../utils/context/authContext';

function Orders() {
  const [orders, setOrders] = useState([]);
  const { user } = useAuth();

  const getContent = () => {
    getOrderCompletedByUser(user).then(setOrders);
  };

  useEffect(() => {
    getContent();
  }, []);

  // ((order) => (order.id === null))).map((filteredOrders)

  return (
    <>
      <article className="posts">
        <h1>Completed Orders</h1>
        <h3>*Upcoming feature will show completed orders by user*</h3>
        {orders.map((filteredOrders) => (
          <section key={`${filteredOrders.id}`} className="post">
            <OrderCard
              id={filteredOrders.id}
              customer={filteredOrders.customer.first_name}
              totalCost={filteredOrders.total_cost}
              dateCreated={filteredOrders.date_created}
              completed={filteredOrders.completed}
              quantity={filteredOrders.quantity}
              onUpdate={getOrderCompletedByUser}
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

export default Orders;
