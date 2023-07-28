import { Box, Typography } from '@mui/material';
import EditNoteForm from './EditNoteForm';
import { useGetNotesQuery } from './notesApiSlice';
import { useParams } from 'react-router-dom';
import useTitle from '../../hooks/useTitle';

function EditNote() {
  useTitle('Edit Note');
  const { noteId } = useParams();

  const { note } = useGetNotesQuery('notesList', {
    selectFromResult: ({ data }) => ({
      note: data.entities[noteId],
    }),
  });
  const content = note ? (
    <EditNoteForm note={note} />
  ) : (
    <Typography variant='p' component='p'>
      loading...
    </Typography>
  );
  return <Box>{content}</Box>;
}

export default EditNote;
