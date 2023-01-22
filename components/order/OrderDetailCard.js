import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
// import { deleteProduct } from '../../utils/data/productData';

export default function OrderCard({
  customer,
  totalCost,
  dateCreated,
  quantity,
  id,
  // onUpdate,
}) {
  // const deleteThisProduct = () => {
  //   if (window.confirm('Delete?')) {
  //     deleteProduct(id).then(() => onUpdate());
  //     window.location.reload();
  //   }
  // };
  return (

    <>
      <Card className="text-center" style={{ width: '25rem' }}>
        <Card.Body>
          <Card.Text>{customer}</Card.Text>
          <Card.Text>{totalCost}</Card.Text>
          <Card.Text>{dateCreated}</Card.Text>
          <Card.Text>{quantity}</Card.Text>
          <Link href={`/product/${id}`} passHref>
            <Button variant="primary" className="m-2">VIEW</Button>
          </Link>
        </Card.Body>
        <Card.Footer />
      </Card>
    </>
  );
}

OrderCard.propTypes = {
  id: PropTypes.number.isRequired,
  customer: PropTypes.number.isRequired,
  totalCost: PropTypes.number.isRequired,
  dateCreated: PropTypes.number.isRequired,
  // completed: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  // onUpdate: PropTypes.func.isRequired,
};