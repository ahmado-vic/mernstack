import { useGetNotesQuery } from './notesApiSlice';
import { IconButton, TableCell, TableRow } from '@mui/material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { useNavigate } from 'react-router-dom';
import { memo } from 'react';

function Note({ noteId }) {
  let content;
  const navigate = useNavigate();

  //select note from queried notes data
  const { note } = useGetNotesQuery('notesList', {
    selectFromResult: ({ data }) => ({
      note: data?.entities[noteId],
    }),
  });

  const handleNavigate = () => navigate(`/dash/notes/${noteId}`);

  if (note) {
    const created = new Date(note.createdAt).toLocaleString('en-US', {
      day: 'numeric',
      month: 'long',
    });
    const updated = new Date(note.updatedAt).toLocaleString('en-US', {
      day: 'numeric',
      month: 'long',
    });

    content = (
      <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
        <TableCell sx={{ color: '#fff' }}>{created}</TableCell>
        <TableCell sx={{ color: '#fff' }}>{updated}</TableCell>
        <TableCell sx={{ color: '#fff' }}>{note?.title}</TableCell>
        <TableCell sx={{ color: '#fff' }}>{note?.body}</TableCell>
        <TableCell sx={{ color: '#fff' }}>{note?.author?.username}</TableCell>
        {note.completed === true ? (
          <TableCell sx={{ color: 'green' }}>Closed</TableCell>
        ) : (
          <TableCell sx={{ color: '#fff' }}>Open</TableCell>
        )}
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

const memoizedNote = memo(Note);

export default memoizedNote;
