import { Box, Button, Typography, styled } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import { useLogoutMutation } from '../features/auth/authApiSlice';
import { useEffect } from 'react';
import usePersist from '../hooks/usePersist';

const StyledHeader = styled(Box)({
  height: '70px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0 1rem',
  position: 'sticky',
  zIndex: 4,
  '& > button > svg': {
    color: '#fff',
    fontSize: '2rem',
  },
  borderBottom: '1px solid #fff',
});

function DashHeader() {
  const navigate = useNavigate();
  const [persist, setPersist] = usePersist();
  const [logout, { iLoading, isSuccess }] = useLogoutMutation();

  if (iLoading)
    <Typography variant='p' component='p'>
      loading...
    </Typography>;

  const handleLogout = e => {
    e.preventDefault();
    setPersist(false);
    logout();
  };

  useEffect(() => {
    if (isSuccess) {
      setPersist(false);
      navigate('/');
    }
  }, [isSuccess, navigate]);
  return (
    <StyledHeader component='header'>
      <Typography variant='h5' component='h5'>
        <Link to='/'>Technotes</Link>
      </Typography>
      <Button>
        <LogoutIcon onClick={handleLogout} />
      </Button>
    </StyledHeader>
  );
}

export default DashHeader;
