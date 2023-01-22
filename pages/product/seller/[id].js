import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
// import { Button } from 'react-bootstrap';
import ProductCard from '../../../components/product/ProductCard';
import { getProductsBySeller } from '../../../utils/data/productData';
// import { useAuth } from '../../utils/context/authContext';

function SellerProducts() {
  const [sellerProducts, setSellerProducts] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  console.warn(sellerProducts);

  useEffect(() => {
    getProductsBySeller(id).then((setSellerProducts));
  }, []);

  return (
    <>
      <article className="users">
        <h1>Products</h1>
        {sellerProducts.map((sellerProduct) => (
          <section key={`user--${sellerProduct.seller.id}`} className="user">
            <ProductCard
              id={sellerProduct.id}
              price={sellerProduct.price}
              title={sellerProduct.title}
              description={sellerProduct.description}
              imageUrl={sellerProduct.image_url}
              quantityAvailable={sellerProduct.quantity_available}
              seller={sellerProduct.seller.id}
              onUpdate={getProductsBySeller}
            />
          </section>
        ))}
      </article>
    </>
  );
}

export default SellerProducts;
