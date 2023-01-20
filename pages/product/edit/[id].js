import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getProductById } from '../../../utils/data/productData';
import ProductForm from '../../../components/product/ProductForm';

export default function EditProduct() {
  const [editProduct, setEditProduct] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getProductById(id).then(setEditProduct);
  }, [id]);

  return (
    <div className="edit-form" style={{ height: '45rem', padding: '10%' }}>
      <ProductForm obj={editProduct} />
    </div>
  );
}
