/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { getBangazonProducts } from '../utils/data/productData';
// import PropTypes from 'prop-types';

export const ShoppingCartContext = React.createContext();

export const CartProvider = ({ children }) => {
  const [cartProducts, setCartProducts] = useState([]);
  const [cartProductIds, setCartProductIds] = useState([]);
  const getOrders = () => {
    getBangazonProducts().then(setCartProducts);
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <ShoppingCartContext.Provider value={{
      cartProducts, setCartProducts, cartProductIds, setCartProductIds,
    }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};

// CartProvider.propTypes = {
//   // eslint-disable-next-line react/forbid-prop-types
//   children: PropTypes.node.isRequired,
// };
