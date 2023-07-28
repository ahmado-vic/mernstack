import { Box, Typography } from '@mui/material';
import NewNoteForm from './NewNoteForm';
import { useSelector } from 'react-redux';
import { selectAllUsers } from '../users/usersApiSlice';
import useTitle from '../../hooks/useTitle';

function NewNote() {
  useTitle('New Note');
  const users = useSelector(selectAllUsers);

  const content = users.length ? (
    <NewNoteForm users={users} />
  ) : (
    <Typography variant='p' component='p'>
      loading...
    </Typography>
  );
  return <Box>{content}</Box>;
}

export default NewNote;
