import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import ProductCard from '../../components/product/ProductCard';
import { getBangazonProducts } from '../../utils/data/productData';
// import { useAuth } from '../../utils/context/authContext';

function Home() {
  const [bangazonProducts, setBangazonProducts] = useState([]);
  const router = useRouter();
  useEffect(() => {
    getBangazonProducts().then((setBangazonProducts));
  }, []);

  return (
    <>
      <Button
        onClick={() => {
          router.push('/users');
        }}
      >
        Users
      </Button>
      <article className="users">
        <h1>Products</h1>
        {bangazonProducts.map((bangazonProduct) => (
          <section key={`user--${bangazonProduct.id}`} className="user">
            <ProductCard
              id={bangazonProduct.id}
              price={bangazonProduct.price}
              title={bangazonProduct.title}
              description={bangazonProduct.description}
              imageUrl={bangazonProduct.image_url}
              quantityAvailable={bangazonProduct.quantity_available}
              sellerId={bangazonProduct.seller_id}
              onUpdate={getBangazonProducts}
            />
          </section>
        ))}
      </article>
    </>
  );
}

export default Home;
