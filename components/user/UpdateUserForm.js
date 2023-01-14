import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useAuth } from '../../utils/context/authContext';
import { updateUser } from '../../utils/data/userData';
// eslint-disable-next-line no-unused-vars
// import { registerUser } from '../utils/auth';
// Update with path to registerUser

const initialState = {
  firstName: '',
  lastName: '',
  createdOn: '',
  imageUrl: '',
};

// eslint-disable-next-line no-unused-vars
function UpdateUserForm({ obj }) {
  const [formData, setFormData] = useState(initialState);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (obj.id)setFormData(obj);
  }, [obj, user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(formData, user.uid).then(() => router.push('/user'));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>First Name</Form.Label>
        <Form.Control name="firstName" required onChange={handleChange} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Last Name</Form.Label>
        <Form.Control name="lastName" required onChange={handleChange} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Profile Image</Form.Label>
        <Form.Control name="imageUrl" required onChange={handleChange} />
      </Form.Group>
      <Button variant="primary" type="submit">
        Update
      </Button>
    </Form>
  );
}

UpdateUserForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.string,
    uid: PropTypes.string.isRequired,
  }).isRequired,
  // updateUser: PropTypes.func.isRequired,
};

export default UpdateUserForm;
