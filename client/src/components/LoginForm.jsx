import { Box, Button, TextField, Typography, styled } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useLoginMutation } from '../features/auth/authApiSlice';
import { useNavigate } from 'react-router-dom';
import usePersist from '../hooks/usePersist';
import useTitle from '../hooks/useTitle';

export const StyledTextField = styled(TextField)({
  marginTop: '3rem',
  '& .MuiOutlinedInput-root': {
    color: '#fff',
    '& > fieldset': {
      border: '1px solid #fff',
    },
    '&:hover > fieldset': {
      color: '#fff',
    },
  },
  '& label': {
    color: '#fff',
  },
  '& label.Mui-focused': {
    color: '#fff',
  },
});

function LoginForm() {
  useTitle('Login Page');

  let ErrorMsg;
  const navigate = useNavigate();
  const userRef = useRef();
  const [persist, setPersist] = usePersist();
  const [login, { isLoading, isSuccess, isError, error }] = useLoginMutation();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  //handlers
  //handle input change.
  const handleChange = e => {
    const { value, name } = e.target;
    setFormData(prev => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  //handle submit formData.
  const handleSubmit = e => {
    e.preventDefault();
    login(formData);
  };

  //validate input fields.
  const casSave = [formData.username, formData.password].every(Boolean);

  if (isLoading)
    <Typography variant='p' component='p'>
      loading...
    </Typography>;

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

  useEffect(() => {
    if (isSuccess) {
      setFormData({
        username: '',
        password: '',
      });
      setPersist(true);
      navigate('/dash');
    }
  }, [isSuccess, navigate, setPersist]);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  return (
    <Box sx={{ padding: '1rem' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant='h6' component='h6'>
          Login User
        </Typography>
      </Box>

      <hr />
      <Box maxWidth='800px'>
        {ErrorMsg}
        <Box
          component='form'
          autoComplete='off'
          onSubmit={handleSubmit}
          sx={{ display: 'flex', flexDirection: 'column', maxWidth: '800px' }}
        >
          <StyledTextField
            inputRef={userRef}
            label='Username'
            variant='outlined'
            fullWidth
            value={formData.username}
            name='username'
            onChange={handleChange}
          />
          <StyledTextField
            label='Password'
            type='password'
            autoComplete='off'
            fullWidth
            value={formData.password}
            name='password'
            onChange={handleChange}
          />
          <br />
          <Button variant='contained' disabled={!casSave} type='submit'>
            login
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default LoginForm;
