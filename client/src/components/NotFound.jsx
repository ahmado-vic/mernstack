import { Box, Typography, styled } from '@mui/material';
import { Link } from 'react-router-dom';
import useTitle from '../hooks/useTitle';

const StyledLink = styled(Link)({
  display: 'block',
  textAlign: 'center',
  textDecoration: 'underline',
  marginTop: '1rem',
});

function NotFound() {
  useTitle('404 Page');
  return (
    <Box sx={{ display: 'flex', margin: 'auto', flexDirection: 'column' }}>
      <Typography variant='h4'>
        404 - Page Not Found <br />
      </Typography>
      <StyledLink to='/'>Back To Home</StyledLink>
    </Box>
  );
}

export default NotFound;
