import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectUserById, updateUserName } from '../redux/slice/UsersSlice';

const UserDetail: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const user = useSelector((state: RootState) => selectUserById(state, Number(userId)));
  const [name, setName] = useState(user?.name || '');
  const dispatch = useDispatch();

  const handleUpdate = () => {
    if (user) {
      dispatch(updateUserName({ id: user.id, name }));
    }
  };

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div>
      <h1>User Detail</h1>
      <p>ID: {user.id}</p>
      <p>
        Name: <input value={name} onChange={(e) => setName(e.target.value)} />
      </p>
      <button onClick={handleUpdate}>Update Name</button>
    </div>
  );
};

export default UserDetail;