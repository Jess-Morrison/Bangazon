import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import UserCard from '../../components/user/UserCard';
import { getBangazonUsers } from '../../utils/data/userData';
import { useAuth } from '../../utils/context/authContext';

function Home() {
  const [bangazonUsers, setBangazonUsers] = useState([]);
  const router = useRouter();
  const { user } = useAuth();
  useEffect(() => {
    getBangazonUsers(user.uid).then((setBangazonUsers));
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
        <h1>Users</h1>
        {bangazonUsers.map((bangazonUser) => (
          <section key={`user--${bangazonUser.id}`} className="user">
            <UserCard
              id={bangazonUser.id}
              firstName={bangazonUser.first_name}
              lastName={bangazonUser.last_name}
              createdOn={bangazonUser.created_on}
              imageUrl={bangazonUser.image_url}
              onUpdate={getBangazonUsers}
            />
          </section>
        ))}
      </article>
    </>
  );
}

export default Home;
