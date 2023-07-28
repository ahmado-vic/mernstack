import {
  Box,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  styled,
} from '@mui/material';
import { StyledTextField } from '../../components/loginForm';
import SaveIcon from '@mui/icons-material/Save';
import { useEffect, useRef, useState } from 'react';
import { useAddNewNoteMutation } from './notesApiSlice';
import { useNavigate } from 'react-router-dom';

export const StyledFormControl = styled(FormControl)({
  marginTop: '3rem',
  '& .MuiOutlinedInput-root': {
    color: '#fff',
    '& > fieldset': {
      border: '1px solid #fff',
    },
  },
  '& label': {
    color: '#fff',
  },
  '& label.Mui-focused': {
    color: '#fff',
  },
  '& svg.MuiSvgIcon-root': {
    color: '#fff',
  },
});

function NewNoteForm({ users }) {
  let ErrorMsg;
  const navigate = useNavigate();
  const titleRef = useRef();
  const [addNewNote, { isSuccess, isError, error }] = useAddNewNoteMutation();
  const [formData, setFormData] = useState({
    title: '',
    body: '',
    author: '',
  });
  const handleChange = e => {
    const { value, name } = e.target;
    setFormData(prev => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    addNewNote(formData);
  };

  if (isError)
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

  const canSave = [formData.title, formData.body, formData.author].every(
    Boolean
  );

  useEffect(() => {
    if (isSuccess) {
      setFormData({
        title: '',
        body: '',
        author: '',
      });
      navigate('/dash/notes');
    }
  }, [isSuccess, navigate]);

  useEffect(() => {
    titleRef.current.focus();
  }, []);

  const usersElm = users.map(user => (
    <MenuItem key={user.id} value={user.id}>
      {user.username}
    </MenuItem>
  ));

  return (
    <Box component='form' autoComplete='off' onSubmit={handleSubmit}>
      <Box maxWidth='800px' padding='1rem'>
        {ErrorMsg}
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant='h6' component='h6'>
            Create Note
          </Typography>
          <IconButton
            aria-label='save'
            sx={{ color: '#fff' }}
            disabled={!canSave}
            type='submit'
          >
            <SaveIcon fontSize='large' />
          </IconButton>
        </Box>
        <StyledTextField
          inputRef={titleRef}
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
            <InputLabel id='demo-simple-select-label'>Author</InputLabel>
            <Select
              name='author'
              value={formData.author}
              label='Author'
              onChange={handleChange}
            >
              {usersElm}
            </Select>
          </StyledFormControl>
        </Box>
      </Box>
    </Box>
  );
}

export default NewNoteForm;
