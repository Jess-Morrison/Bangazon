import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useAuth } from '../utils/context/authContext';
import { updateUser } from '../utils/data/userData';
// eslint-disable-next-line no-unused-vars
import { registerUser } from '../utils/auth'; // Update with path to registerUser

const initialState = {
  firstName: '',
  lastName: '',
  createdOn: '',
  imageUrl: '',
};

// eslint-disable-next-line no-unused-vars
function RegisterForm({ obj, updateRegUser }) {
  const [formData, setFormData] = useState(initialState);
  const { user } = useAuth();
  const router = useRouter();
  // console.warn(obj.id);

  useEffect(() => {
    if (obj.id)setFormData(obj);
  }, [obj, user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.id) {
      updateUser(formData).then(() => router.push('/user'));
    } else {
      registerUser(formData, user).then(() => updateRegUser(user.uid));
    }
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
      {/* <Button type="submit">{obj.id ? 'Update' : 'Create'}</Button> */}
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

RegisterForm.propTypes = {
  obj: PropTypes.shape({
    uid: PropTypes.string.isRequired,
    id: PropTypes.number,
  }).isRequired,
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }).isRequired,
  updateRegUser: PropTypes.func.isRequired,
};

export default RegisterForm;
