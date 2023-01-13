import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getUserById } from '../../utils/data/userData';
import UserCard from '../../components/user/UserCard';

export default function ViewUser() {
  const [viewUsers, setViewUser] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getUserById(id).then(setViewUser);
  }, [id]);

  return (
    <div className="view-card">
      <UserCard
        key={id}
        id={viewUsers.id}
        firstName={viewUsers.first_name}
        lastName={viewUsers.last_name}
        createdOn={viewUsers.created_on}
        imageUrl={viewUsers.image_url}
      />
    </div>
  );
}
