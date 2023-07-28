import { Box, Button, Typography, styled } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const StyledFooter = styled(Box)({
  display: 'flex',
  marginTop: 'auto',
  borderTop: '1px solid #fff',
  '& > button > svg': {
    color: '#fff',
    fontSize: '2rem',
  },
});

function DashFooter() {
  const { username, status } = useAuth();
  const navigate = useNavigate();
  const handleNavigate = () => navigate('/dash');

  return (
    <StyledFooter>
      <Button onClick={handleNavigate}>
        <HomeIcon />
      </Button>
      <Box
        sx={{
          display: 'flex',
          height: '70px',
          gap: '2rem',
          alignItems: 'center',
        }}
      >
        <Typography variant='p' component='p'>
          Welcome : {username}
        </Typography>
        <Typography variant='p' component='p'>
          Status : {status}
        </Typography>
      </Box>
    </StyledFooter>
  );
}

export default DashFooter;
