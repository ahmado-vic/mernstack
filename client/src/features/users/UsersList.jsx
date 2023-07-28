import { useGetUsersQuery } from './usersApiSlice';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import User from './User';
import useTitle from '../../hooks/useTitle';

function UsersList() {
  useTitle('View Users');

  let content;
  const {
    data: users,
    isLoading,
    isFetching,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery('usersList', {
    pollingInterval: 3000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  if (isLoading || isFetching)
    content = <Typography variant='p'>loading...</Typography>;
  if (isError)
    content = (
      <Typography
        variant='p'
        color='#fff'
        backgroundColor='red'
        padding='0rem 1rem'
      >
        {error.status} {error?.data?.message}
      </Typography>
    );

  if (isSuccess) {
    const { ids } = users;
    const tableContent = ids?.length
      ? ids.map(userId => <User key={userId} userId={userId} />)
      : null;

    content = (
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: '#fff' }}>Created at</TableCell>
              <TableCell sx={{ color: '#fff' }}>Updated at</TableCell>
              <TableCell sx={{ color: '#fff' }}>Username</TableCell>
              <TableCell sx={{ color: '#fff' }}>Roles</TableCell>
              <TableCell sx={{ color: '#fff' }}>Status</TableCell>
              <TableCell sx={{ color: '#fff' }}>Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{tableContent}</TableBody>
        </Table>
      </TableContainer>
    );
  }

  return content;
}

export default UsersList;
