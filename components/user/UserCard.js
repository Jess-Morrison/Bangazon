import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import { deleteUser } from '../../utils/data/userData';

export default function UserCard({
  firstName, lastName, id, createdOn, imageUrl, onUpdate,
}) {
  const deleteThisUser = () => {
    if (window.confirm('Delete?')) {
      deleteUser(id).then(() => onUpdate());
      window.location.reload();
    }
  };
  return (

    <>
      <Card className="text-center" style={{ width: '25rem' }}>
        <Card.Body>
          <Card.Title>{firstName} {lastName}</Card.Title>
          <Card.Img variant="top" src={imageUrl} alt={firstName} style={{ height: '200px' }} />
          <Card.Text>{createdOn}</Card.Text>
          <Link href={`/user/${id}`} passHref>
            <Button variant="primary" className="m-2">VIEW</Button>
          </Link>
          <Link href={`/user/edit/${id}`} passHref>
            <Button variant="info">EDIT</Button>
          </Link>
          <Button variant="danger" onClick={deleteThisUser} className="m-2">
            DELETE
          </Button>
        </Card.Body>
        <Card.Footer />
      </Card>
    </>
  );
}

UserCard.propTypes = {
  id: PropTypes.number.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  createdOn: PropTypes.number.isRequired,
  onUpdate: PropTypes.func.isRequired,
};
