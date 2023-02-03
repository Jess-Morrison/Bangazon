import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getProductById } from '../../utils/data/productData';
import ProductCard from '../../components/product/ProductCard';

export default function ViewProduct() {
  const [viewProducts, setViewProducts] = useState([]);
  const router = useRouter();
  const { id } = router.query;
  // console.warn(viewProducts.price);

  useEffect(() => {
    getProductById(id).then(setViewProducts);
  }, [id]);

  return (
    <div className="view-card">
      <ProductCard
        key={viewProducts}
        // userCardObj={getUserById}
        id={viewProducts.id}
        seller={viewProducts.seller_id}
        price={viewProducts.price}
        title={viewProducts.title}
        description={viewProducts.description}
        imageUrl={viewProducts.imageUrl}
        quantityAvailabl={viewProducts.quantityAvailable}
        onUpdate={getProductById}
      />
    </div>
  );
}
