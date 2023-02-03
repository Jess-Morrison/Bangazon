// import React from 'react';
// import React, { useContext, useEffect } from 'react';
import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import { getBangazonUsers } from '../../utils/data/userData';
// import { ShoppingCartContext } from '../shoppingCartContext';
// import { deleteProduct } from '../../utils/data/productData';
// import { getBangazonProducts } from '../../utils/data/productData';

export default function ProductCard({
  id,
  // seller,
  price,
  title,
  description,
  imageUrl,
  quantityAvailable,

  // onUpdate,
  // productObj,
}) {
  // const deleteThisProduct = () => {
  //   if (window.confirm('Delete?')) {
  //     deleteProduct(id).then(() => onUpdate());
  //     window.location.reload();
  //   }
  // };
  // console.warn(productObj);
  // const router = useRouter();
  // const { user } = router.query;
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getBangazonUsers().then((setUsers));
  }, []);
  // console.warn(user.id);

  return (

    <>
      <Card className="text-center" style={{ width: '25rem' }}>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Img variant="top" src={imageUrl} alt={title} style={{ height: '200px' }} />
          <Card.Text>Description:{description}</Card.Text>
          <Card.Text>Price:{price}</Card.Text>
          <Card.Text>Quantity:{quantityAvailable}</Card.Text>
          {/* <Card.Text>Seller:{firstName}</Card.Text> */}
          <Link href={`/product/${id}`} passHref>
            <Button variant="primary" className="m-2">VIEW</Button>
          </Link>
          <Link href={`/product/edit/${id}`} passHref>
            <Button variant="info">EDIT</Button>
          </Link>
          {users.map((user) => (
            <Link href={`/order/shoppingCart/${user.id}`} passHref>
              <Button variant="info">Purchase</Button>
            </Link>
          ))}
          {/* <Button variant="danger" onClick={deleteThisProduct} className="m-2">
            DELETE
          </Button> */}
        </Card.Body>
        <Card.Footer />
      </Card>
    </>
  );
}

ProductCard.propTypes = {
  id: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  // seller: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  quantityAvailable: PropTypes.number.isRequired,

  // onUpdate: PropTypes.func.isRequired,
};

// id: PropTypes.number.isRequired,
//   price: PropTypes.number.isRequired,
//   title: PropTypes.string.isRequired,
//   // seller: PropTypes.string.isRequired,
//   description: PropTypes.string.isRequired,
//   imageUrl: PropTypes.string.isRequired,
//   quantityAvailable: PropTypes.number.isRequired,

// productObj: PropTypes.shape({
//   id: PropTypes.number,
//   price: PropTypes.number,
//   title: PropTypes.string,
//   seller: PropTypes.string.isRequired,
//   description: PropTypes.string,
//   imageUrl: PropTypes.string,
//   quantityAvailable: PropTypes.number,
//   // seller: PropTypes.shape({
//   //   firstName: PropTypes.string,
//   //   lastName: PropTypes.string,
//   // }),
// }).isRequired,

// productObj: PropTypes.shape({
//   id: PropTypes.number,
//   price: PropTypes.number,
//   title: PropTypes.string,
//   seller: PropTypes.string,
//   description: PropTypes.string,
//   imageUrl: PropTypes.string,
//   quantityAvailable: PropTypes.number,
// }).isRequired,
