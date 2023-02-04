import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import ShoppingCart from '../../../components/order/ShoppingCartCard';
// import MainOrderCard from '../../../components/order/MainOrderCard';
import { deleteOrderProduct, activeOrdersByCustomer, updateOrderProduct } from '../../../utils/data/orderProductData';

export default function CustomerShoppingCart() {
  const router = useRouter();
  const { user } = router.query;
  const [activeOrder, setActiveOrder] = useState([]);
  // console.warn(activeOrder);

  useEffect(() => {
    activeOrdersByCustomer(user).then(setActiveOrder);
  }, [user]);

  // console.warn(activeOrder);

  const handleDecrement = (productId) => {
    const orderToUpdate = activeOrder.find((orderProduct) => orderProduct.product.id === productId);
    const { order } = orderToUpdate.order;
    if (order.quantity > 1) {
      const updatedOrderProducts = activeOrder.map((orderProduct) => {
        if (orderProduct.product.id === productId) {
          return {
            ...orderProduct,
            order: {
              ...order,
              quantity: order.quantity - 1,
            },
          };
        }
        return orderProduct;
      });
      setActiveOrder(updatedOrderProducts);
      updateOrderProduct(orderToUpdate.id, {
        product: orderToUpdate.product.id,
        order: order.id,
        quantity: order.quantity,
        // quantity: orderToUpdate.order.quantity - 1,
      }).then(() => setActiveOrder(orderToUpdate));
    } else {
      deleteOrderProduct(orderToUpdate.id).then(() => {
        setActiveOrder(orderToUpdate.filter((orderProduct) => orderProduct.id !== orderToUpdate.id));
      });
    }
  };

  const handleIncrement = (productId) => {
    const updatedOrderProducts = activeOrder.map((orderProduct) => {
      if (orderProduct.product.id === productId) {
        return { ...orderProduct, quantity: orderProduct.quantity + 1 };
      }
      return orderProduct;
    });
    setActiveOrder(updatedOrderProducts);
    const orderToUpdate = updatedOrderProducts.find((orderProduct) => orderProduct.product.id === productId);
    const { order } = orderToUpdate.order;
    updateOrderProduct(orderToUpdate.id, {
      product: orderToUpdate.product.id,
      order: order.id,
      quantity: order.quantity,
      // id: orderToUpdate.id,
      // product: orderToUpdate.product.id,
      // order: orderToUpdate.order.id,
      // quantity: orderToUpdate.quantity,
      // quantity: orderToUpdate.order.quantity,
    }).then(() => setActiveOrder(updatedOrderProducts));
  };

  const handleDelete = (orderProductId) => {
    deleteOrderProduct(orderProductId).then(() => {
      setActiveOrder(activeOrder.filter((orderProduct) => orderProduct.id !== orderProductId));
    });
  };

  return (
    <>
      <ShoppingCart orderProductObj={Array.from(activeOrder)} handleDecrement={handleDecrement} handleIncrement={handleIncrement} handleDelete={handleDelete} />
    </>
  );
}
