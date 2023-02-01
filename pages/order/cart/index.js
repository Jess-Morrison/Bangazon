import React, { useContext } from 'react';
// import React, { useEffect, useState } from 'react';
// import ProductCard from '../../../components/product/ProductCard';
// import { getBangazonProducts } from '../../../utils/data/productData';
import Cart from '../../../components/CartPage';
import { ShoppingCartContext } from '../../../components/shoppingCartContext';
import OrderForm from '../../../components/order/OrderForm';

export default function CartView() {
  // const [orderProducts, setOrderProducts] = useState([]);
  // const getProducts = (id) => {
  //   getBangazonProducts(id).then(setOrderProducts);
  // };
  // useEffect(() => {
  //   getProducts();
  // }, []);
  const { cartProducts, cartProductIds } = useContext(ShoppingCartContext);
  // const { cartProducts } = useContext(ShoppingCartContext);
  // console.warn(cartProducts);

  // return (
  //   <div>
  //     <Cart cartProducts={cartProducts} />
  //   </div>
  // );

  return (
    <div>
      <Cart cartProducts={cartProducts} />
      {cartProductIds.length !== 0 && <OrderForm cartProductIds={cartProductIds} cartProducts={cartProducts} />}
    </div>
  );
}

// // return (
//   //   <div>
//   //     {orderProducts.map((orderProduct) => (
//   //       <ProductCard key={orderProduct.Id} productObj={orderProduct} onUpdate={getBangazonProducts} />

//   //     ))}
//   //   </div>
//   // );
//   return (
//     <div className="edit-form" style={{ height: '45rem', padding: '10%' }}>
//       <OrderForm postObj={orderProducts} />
//     </div>
//   );
// ),
