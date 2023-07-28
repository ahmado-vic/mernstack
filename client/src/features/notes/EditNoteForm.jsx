import {
  Box,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { StyledTextField } from '../../components/loginForm';
import { StyledFormControl } from './NewNoteForm';
import { useDeleteNoteMutation, useEditNoteMutation } from './notesApiSlice';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useAuth from '../../hooks/useAuth';

function EditNoteForm({ note }) {
  let ErrorMsg;
  let content;
  const { isManager } = useAuth();
  const navigate = useNavigate();
  const [editNote, { isSuccess, isError, error }] = useEditNoteMutation();
  const [deleteNote, { isSuccess: isSuccessDelete, isError: isErrorDelete }] =
    useDeleteNoteMutation();
  const [completed, setCompleted] = useState(note.completed);
  const [formData, setFormData] = useState({
    id: note.id,
    title: note.title,
    body: note.body,
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangeStatus = useCallback(e => {
    const { value } = e.target;
    if (value === 'open') setCompleted(false);
    if (value === 'closed') setCompleted(true);
  }, []);

  if (isError || isErrorDelete)
    ErrorMsg = (
      <Typography
        variant='p'
        component='p'
        color='#fff'
        backgroundColor='red'
        padding='0rem 1rem'
      >
        {error?.data?.message}
      </Typography>
    );

  const handleSubmit = useCallback(
    e => {
      e.preventDefault();
      editNote({ ...formData, completed });
    },
    [formData, completed, editNote]
  );

  const handleDelete = useCallback(
    e => {
      e.preventDefault();
      deleteNote(note.id);
    },
    [deleteNote, note.id]
  );

  useEffect(() => {
    if (isSuccess || isSuccessDelete) {
      setFormData({
        id: '',
        title: '',
        body: '',
      });
      setCompleted(false);
      navigate('/dash/notes');
    }
  }, [isSuccess, isSuccessDelete, navigate]);

  const canSave = [formData.title, formData.body].every(Boolean);

  if (note) {
    content = (
      <Box component='form' autoComplete='off'>
        <Box maxWidth='800px' padding='1rem'>
          {ErrorMsg}
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant='h6' component='h6'>
              Create Note
            </Typography>
            <Box>
              <IconButton
                aria-label='save'
                sx={{ color: '#fff' }}
                disabled={!canSave}
                onClick={handleSubmit}
              >
                <SaveIcon fontSize='large' />
              </IconButton>
              {isManager ? (
                <IconButton
                  aria-label='delete'
                  sx={{ color: '#fff' }}
                  onClick={handleDelete}
                >
                  <DeleteIcon fontSize='large' />
                </IconButton>
              ) : (
                ''
              )}
            </Box>
          </Box>
          <StyledTextField
            fullWidth
            label='Note Title'
            id='fullWidth'
            name='title'
            value={formData.title}
            onChange={handleChange}
          />
          <StyledTextField
            fullWidth
            label='Note Description'
            id='fullWidth'
            name='body'
            value={formData.body}
            onChange={handleChange}
          />
          <Box sx={{ minWidth: 120 }}>
            <StyledFormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                name='completed'
                value={completed ? 'closed' : 'open'}
                label='Status'
                onChange={handleChangeStatus}
              >
                <MenuItem value='open'>open</MenuItem>
                <MenuItem value='closed'>closed</MenuItem>
              </Select>
            </StyledFormControl>
          </Box>
        </Box>
      </Box>
    );
  }

  return content;
}

//prop-types
EditNoteForm.propTypes = {
  note: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    completed: PropTypes.bool,
  }),
};

export default EditNoteForm;
