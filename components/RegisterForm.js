import PropTypes from 'prop-types';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
// eslint-disable-next-line no-unused-vars
import { registerUser } from '../utils/auth'; // Update with path to registerUser

const initialState = {
  firstName: '',
  lastName: '',
  createdOn: '',
  imageUrl: '',
};

// eslint-disable-next-line no-unused-vars
function RegisterForm({ user, updateUser }) {
  const [formData, setFormData] = useState(initialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(formData, user).then(() => updateUser(user.uid));
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
        Submit
      </Button>
    </Form>
  );
}

RegisterForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }).isRequired,
  updateUser: PropTypes.func.isRequired,
};

export default RegisterForm;
