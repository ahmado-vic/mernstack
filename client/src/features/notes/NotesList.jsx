import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useGetNotesQuery } from './notesApiSlice';
import Note from './Note';
import useTitle from '../../hooks/useTitle';

function NotesList() {
  useTitle('View Notes');

  let content;

  const {
    data: notes,
    isLoading,
    isSuccess,
    isFetching,
    isError,
    error,
  } = useGetNotesQuery('notesList', {
    pollingInterval: 3000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  if (isLoading || isFetching)
    <Typography variant='p' component='p' color='#fff'>
      Loading...
    </Typography>;

  if (isError)
    return (
      <Typography variant='h6' component='p'>
        {error.status} {error?.data?.message}
      </Typography>
    );

  if (isSuccess) {
    const { ids } = notes;
    const tableContent = ids?.length
      ? ids.map(noteId => <Note key={noteId} noteId={noteId} />)
      : null;

    content = (
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: '#fff' }}>Created at</TableCell>
              <TableCell sx={{ color: '#fff' }}>Updated at</TableCell>
              <TableCell sx={{ color: '#fff' }}>Title</TableCell>
              <TableCell sx={{ color: '#fff' }}>Body</TableCell>
              <TableCell sx={{ color: '#fff' }}>Author</TableCell>
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

export default NotesList;
