import { useEffect, useState } from 'react';
import { useDeleteUserMutation, useEditUserMutation } from './usersApiSlice';
import {
  Box,
  FormControlLabel,
  FormLabel,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  Typography,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import { StyledTextField } from '../../components/loginForm';
import { StyledFormControl } from '../notes/NewNoteForm';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const USER_RGX = /^[A-Za-z]{3,20}$/;
const PWD_RGX = /^[A-z0-9!@#$%]{4,12}$/;

function EditUserForm({ user }) {
  let content;
  let ErrorMsg;
  let canSave;
  const [editUser, { isLoading, isSuccess, isError, error }] =
    useEditUserMutation();
  const [
    deleteUser,
    { isSuccess: isSuccessDelete, isError: isErrorDelete, error: errorDelete },
  ] = useDeleteUserMutation();
  const [formData, setFormData] = useState({
    id: user.id,
    username: user.username,
    password: '',
    roles: user.roles,
  });
  const [active, setActive] = useState(user.active);
  const [verifiedPWD, setVerifiedPWD] = useState(false);
  const [verifiedUsername, setValidUsername] = useState(false);
  const navigate = useNavigate();
  const { isAdmin, isManager } = useAuth();

  if (isLoading) content = <Typography variant='p'>loading...</Typography>;

  if (isError || isErrorDelete)
    ErrorMsg = (
      <Typography
        variant='p'
        component='p'
        color='#fff'
        backgroundColor='red'
        padding='0rem 1rem'
      >
        {error
          ? error?.data?.message
          : errorDelete
          ? errorDelete?.data?.message
          : ''}
      </Typography>
    );

  //handlers
  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangeStatus = e => {
    const { value } = e.target;
    if (value === 'Active') setActive(true);
    if (value === 'Pending') setActive(false);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await editUser({ ...formData, active });
  };

  const handleDelete = async e => {
    e.preventDefault();
    await deleteUser(user.id);
  };

  useEffect(() => {
    setValidUsername(USER_RGX.test(formData.username));
  }, [formData.username]);

  useEffect(() => {
    setVerifiedPWD(PWD_RGX.test(formData.password));
  }, [formData.password]);

  useEffect(() => {
    if (isSuccess || isSuccessDelete) {
      setFormData({
        username: '',
        password: '',
        roles: [],
      });
      setActive(false);
      navigate('/dash/users');
    }
  }, [isSuccess, navigate, isSuccessDelete]);

  if (formData.password) {
    canSave = [formData.username, formData.password].every(Boolean);
  } else {
    canSave = Boolean(formData.username);
  }

  if (user) {
    content = (
      <Box component='form' autoComplete='off'>
        <Box maxWidth='800px' padding='1rem'>
          {ErrorMsg}
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant='h6' component='h6'>
              Edit User
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
            error={!verifiedUsername ? true : false}
            fullWidth
            label='Username'
            name='username'
            helperText='[3-20 letters]'
            value={formData.username}
            onChange={handleChange}
            sx={{ '& .MuiFormHelperText-root': { color: '#fff' } }}
          />
          <StyledTextField
            error={formData.password && !verifiedPWD ? true : false}
            fullWidth
            label='Password'
            name='password'
            type='password'
            helperText='[4-12 chars incl. !@#$%]'
            value={formData.password}
            onChange={handleChange}
            sx={{ '& .MuiFormHelperText-root': { color: '#fff' } }}
          />
          {isManager ? (
            <Box sx={{ minWidth: 120 }}>
              <StyledFormControl fullWidth>
                <InputLabel id='roles'>Roles</InputLabel>
                <Select
                  multiple
                  labelId='roles'
                  input={<OutlinedInput label='Roles' />}
                  name='roles'
                  value={formData.roles}
                  onChange={handleChange}
                >
                  <MenuItem disabled value=''>
                    <em>Select Roles</em>
                  </MenuItem>
                  <MenuItem value='Employee'>Employee</MenuItem>
                  <MenuItem value='Admin'>Admin</MenuItem>
                  <MenuItem value='Manager'>Manager</MenuItem>
                </Select>
              </StyledFormControl>
            </Box>
          ) : (
            ''
          )}
          <StyledFormControl>
            <FormLabel id='user_Status'>Status</FormLabel>
            <RadioGroup
              row
              aria-labelledby='user_status'
              name='active'
              onChange={handleChangeStatus}
              value={active ? 'Active' : 'Pending'}
            >
              <FormControlLabel
                value='Active'
                control={<Radio />}
                label='Active'
              />
              <FormControlLabel
                value='Pending'
                control={<Radio />}
                label='Pending'
              />
            </RadioGroup>
          </StyledFormControl>
        </Box>
      </Box>
    );
  }

  return content;
}

export default EditUserForm;
