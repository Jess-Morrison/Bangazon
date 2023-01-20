import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getUserById } from '../../../utils/data/userData';
import RegisterForm from '../../../components/RegisterForm';

export default function EditUser() {
  const [editUser, setEditUser] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getUserById(id).then(setEditUser);
  }, [id]);

  return (
    <div className="edit-form" style={{ height: '45rem', padding: '10%' }}>
      <RegisterForm obj={editUser} />
    </div>
  );
}
