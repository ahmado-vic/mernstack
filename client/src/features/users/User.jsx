import { memo } from 'react';
import { useGetUsersQuery } from './usersApiSlice';
import { useNavigate } from 'react-router-dom';
import { IconButton, TableCell, TableRow } from '@mui/material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

function User({ userId }) {
  let content;
  const navigate = useNavigate();

  //select user from queried users data
  const { user } = useGetUsersQuery('usersList', {
    selectFromResult: ({ data }) => ({
      user: data?.entities[userId],
    }),
  });

  if (user) {
    const created = new Date(user.createdAt).toLocaleString('en-US', {
      day: 'numeric',
      month: 'long',
    });
    const updated = new Date(user.updatedAt).toLocaleString('en-US', {
      day: 'numeric',
      month: 'long',
    });
    const roles = user.roles.join(', ');

    const handleNavigate = () => navigate(`/dash/users/${userId}`);
    content = (
      <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
        <TableCell sx={{ color: '#fff' }}>{created}</TableCell>
        <TableCell sx={{ color: '#fff' }}>{updated}</TableCell>
        <TableCell sx={{ color: '#fff' }}>{user.username}</TableCell>
        <TableCell sx={{ color: '#fff' }}>{roles}</TableCell>
        <TableCell sx={{ color: '#fff' }}>
          {user.active ? 'Active' : 'Pending'}
        </TableCell>
        <TableCell sx={{ color: '#fff' }}>
          <IconButton aria-label='edit' onClick={handleNavigate}>
            <ModeEditIcon sx={{ color: '#fff' }} />
          </IconButton>
        </TableCell>
      </TableRow>
    );
  }
  return content;
}

const memoizedUser = memo(User);
export default memoizedUser;
