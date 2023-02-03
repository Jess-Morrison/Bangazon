/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import PropTypes from 'prop-types';
// import Link from 'next/link';
import { Button, Form } from 'react-bootstrap';
import { useRouter } from 'next/router';
// import { useAuth } from '../../utils/context/authContext';
import { createProduct, updateProduct } from '../../utils/data/productData';
import { getBangazonUsers } from '../../utils/data/userData';

const initialState = {

  id: null,
  seller: '',
  title: '',
  imageUrl: '',
  description: '',
  price: 0,
  quantityAvailable: 0,
};

const ProductForm = ({ productObj }) => {
  const [product, setProduct] = useState(initialState);
  const [sellers, setSeller] = useState([]);
  const router = useRouter();

  // useEffect((id) => {
  //   getPayment(id).then(setPaymentTypes);
  // }, []);
  useEffect((id) => {
    getBangazonUsers(id).then(setSeller);
  }, []);

  console.warn(sellers);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (productObj.id) {
      updateProduct(product, productObj.id).then(() => router.push('/product'));
    } else {
      createProduct(product).then(() => router.push('/product'));
    }
  };

  const getAndSet = () => {
    if (productObj.id) {
      setProduct(productObj);
    }
  };
  useEffect(() => {
    getAndSet();
  }, [productObj]);

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          {/* <Form.Label>Seller</Form.Label>
          <Form.Control name="seller" required value={product.seller} onChange={handleChange} /> */}
          <Form.Label>Title</Form.Label>
          <Form.Control name="title" required value={product.title} onChange={handleChange} />
          <Form.Label>Description</Form.Label>
          <Form.Control name="description" required value={product.description} onChange={handleChange} />
          <Form.Label>Image</Form.Label>
          <Form.Control name="imageUrl" required value={product.imageUrl} onChange={handleChange} />
          <Form.Label>Price</Form.Label>
          <Form.Control name="price" required value={product.price} onChange={handleChange} />
          <Form.Label>Quantity</Form.Label>
          <Form.Control name="quantityAvailable" required value={product.quantityAvailable} onChange={handleChange} />
          <FloatingLabel controlId="floatingSelect">
            <Form.Select
              aria-label="Seller"
              name="seller"
              type="text"
              value={sellers.id}
              onChange={handleChange}
              className="mb-3"
              required
            >
              <option value="">Seller</option>
              {
            sellers.map((seller) => (
              <option
                key={seller.id}
                value={seller.id}
                // selected={game.title}
              >
                {seller.first_name}
              </option>
            ))
          }
            </Form.Select>
          </FloatingLabel>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

ProductForm.propTypes = {
  productObj: PropTypes.shape({
    id: PropTypes.number,
    seller: PropTypes.string,
    title: PropTypes.string,
    imageUrl: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
    quantityAvailable: PropTypes.number,
  }),
};

ProductForm.defaultProps = {
  productObj: initialState,
};

export default ProductForm;
