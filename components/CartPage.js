import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import { ShoppingCartContext } from './shoppingCartContext';

function Cart({ cartProducts }) {
  const { setCartProductIds, setCartProducts } = useContext(ShoppingCartContext);

  const onRemove = (id) => {
    setCartProducts((products) => products.filter((product) => product.id !== id));
    setCartProductIds((productIds) => productIds.filter((productId) => productId !== id));
  };

  return (
    <main className="block col-2">
      <h2>My Cart</h2>
      <div className="row">
        {cartProducts.length === 0 && <div>Cart Is Empty</div>}
      </div>
      {cartProducts.map((product) => (
        <div key={product?.id}>
          <div>
            <Image src={product.imageUrl} alt={product.title} width="450" height="500" />
          </div>
          <div>
            <p>{product.title}</p>
            <p>Seller: {product.seller} </p>
            <p>${product.price}</p>
            <p>Quantity: {product.quantity}</p>
          </div>
          <div>
            <Button variant="danger" onClick={() => onRemove(product.id)}>Remove from Cart</Button>
          </div>
        </div>
      ))}
    </main>
  );
}

Cart.propTypes = {
  cartProducts: PropTypes.arrayOf(PropTypes.shape({
    productObj: PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      imageUrl: PropTypes.string,
      price: PropTypes.string,
      seller: PropTypes.string,
      quantity: PropTypes.number,
      // seller: PropTypes.shape({
      //   id: PropTypes.number,
      //   firstName: PropTypes.string,
      //   lastName: PropTypes.string,
      // }),
    }),
  })).isRequired,
// }.isRequired;
};

export default Cart;
