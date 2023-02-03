import React from 'react';
import ProductForm from '../../components/product/ProductForm';
import { useAuth } from '../../utils/context/authContext';

export default function NewPost() {
  const { user } = useAuth();
  return (
    <div>
      <h2>Add a new Product</h2>
      <ProductForm user={user} />
    </div>
  );
}
