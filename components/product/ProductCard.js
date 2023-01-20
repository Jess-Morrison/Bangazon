import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import { deleteProduct } from '../../utils/data/productData';

export default function ProductCard({
  id,
  seller,
  price,
  title,
  description,
  imageUrl,
  quantityAvailable,
  onUpdate,
}) {
  const deleteThisProduct = () => {
    if (window.confirm('Delete?')) {
      deleteProduct(id).then(() => onUpdate());
      window.location.reload();
    }
  };
  return (

    <>
      <Card className="text-center" style={{ width: '25rem' }}>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Img variant="top" src={imageUrl} alt={title} style={{ height: '200px' }} />
          <Card.Text>{description}</Card.Text>
          <Card.Text>{price}</Card.Text>
          <Card.Text>{quantityAvailable}</Card.Text>
          <Card.Text>{seller}</Card.Text>
          <Link href={`/product/${id}`} passHref>
            <Button variant="primary" className="m-2">VIEW</Button>
          </Link>
          <Link href={`/product/edit/${id}`} passHref>
            <Button variant="info">EDIT</Button>
          </Link>
          <Button variant="danger" onClick={deleteThisProduct} className="m-2">
            DELETE
          </Button>
        </Card.Body>
        <Card.Footer />
      </Card>
    </>
  );
}

ProductCard.propTypes = {
  id: PropTypes.number.isRequired,
  seller: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  quantityAvailable: PropTypes.number.isRequired,
  onUpdate: PropTypes.func.isRequired,
};
