import {
  Box,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { StyledTextField } from '../../components/loginForm';
import { StyledFormControl } from '../notes/NewNoteForm';
import { useEffect, useRef, useState } from 'react';
import { useAddNewUserMutation } from './usersApiSlice';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const USER_RGX = /^[A-Za-z]{3,20}$/;
const PWD_RGX = /^[A-z0-9!@#$%]{4,12}$/;

function NewUserForm() {
  let ErrorMsg;
  const navigate = useNavigate();
  const userRef = useRef();
  const [addNewUser, { isLoading, isSuccess, isError, error }] =
    useAddNewUserMutation();
  const [validUsername, setValidUsername] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [roles, setRoles] = useState(['Employee']);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

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

  //handler functions
  const handleChange = e => {
    const { name, value } = e.target;

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleChangeRoles = e => {
    const { value } = e.target;
    if (typeof value === 'string') value.join(', ');
    setRoles([...value]);
  };

  const handleSubmit = e => {
    e.preventDefault();
    addNewUser({ ...formData, roles });
  };

  useEffect(() => {
    if (isSuccess) {
      setFormData({
        username: '',
        password: '',
      });
      setRoles([]);
      navigate('/dash/users');
    }
  }, [isSuccess, navigate]);

  useEffect(() => {
    setValidUsername(USER_RGX.test(formData.username));
  }, [formData.username, setValidUsername]);

  useEffect(() => {
    setValidPassword(PWD_RGX.test(formData.password));
  }, [formData.password, setValidPassword]);

  useEffect(() => {
    userRef.current.focus();
  }, []);
  const canSave = [
    formData.username,
    formData.password,
    validUsername,
    validPassword,
  ].every(Boolean);

  return (
    <Box
      variant='form'
      autoComplete='off'
      component='form'
      onSubmit={handleSubmit}
    >
      <Box maxWidth='800px' padding='1rem'>
        {ErrorMsg}
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant='h6' component='h6'>
            Create User
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
          inputRef={userRef}
          error={!validUsername ? true : false}
          fullWidth
          label='Username'
          name='username'
          helperText='[3-20 letters]'
          value={formData.username}
          onChange={handleChange}
          sx={{
            '& .MuiFormHelperText-root': { color: '#fff' },
          }}
        />
        <StyledTextField
          error={!validPassword ? true : false}
          fullWidth
          type='password'
          label='Password'
          name='password'
          helperText='[4-12 chars incl. !@#$%]'
          autoComplete='off'
          value={formData.password}
          onChange={handleChange}
          sx={{ '& .MuiFormHelperText-root': { color: '#fff' } }}
        />
        <StyledFormControl fullWidth>
          <InputLabel id='roles'>Roles</InputLabel>
          <Select
            multiple
            labelId='roles'
            input={<OutlinedInput label='Roles' />}
            name='roles'
            value={roles}
            onChange={handleChangeRoles}
          >
            <MenuItem disabled value=''>
              <em>Select Roles</em>
            </MenuItem>
            <MenuItem value='Admin'>Admin</MenuItem>
            <MenuItem value='Manager'>Manager</MenuItem>
          </Select>
        </StyledFormControl>
      </Box>
    </Box>
  );
}

NewUserForm.propTypes = {
  username: PropTypes.string,
  password: PropTypes.string,
  roles: PropTypes.arrayOf(PropTypes.string),
};

export default NewUserForm;
