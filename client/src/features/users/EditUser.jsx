import { useParams } from 'react-router-dom';
import { useGetUsersQuery } from './usersApiSlice';
import EditUserForm from '../users/EditUserForm';
import { Typography } from '@mui/material';
import useTitle from '../../hooks/useTitle';

function EditUser() {
  useTitle('Edit User');
  let content;
  const { userId } = useParams();
  const { user } = useGetUsersQuery('usersList', {
    selectFromResult: ({ data }) => ({
      user: data?.entities[userId],
    }),
  });

  user ? (
    (content = <EditUserForm user={user} />)
  ) : (
    <Typography variant='p' component='p'>
      loading...
    </Typography>
  );

  return content;
}

export default EditUser;
