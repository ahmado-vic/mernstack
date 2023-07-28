import { Box, Link, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import usePersist from '../hooks/usePersist';

function Public() {
  const [persist] = usePersist();
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Box component='header' pl='1rem'>
        <Typography variant='h2' component='h2' mb='2rem'>
          Welcome to Dan D. Repairs
        </Typography>
      </Box>
      <Box component='main' pl='1rem'>
        <Typography variant='p' component='p' mb='1rem'>
          Located in Beautiful Downtown Foo City, Dan D. Repairs provides a
          trained staff ready to meet your tech repair needs.
        </Typography>
        <Typography variant='p' component='address'>
          Dan D. Repairs
          <br />
          555 Foo Drive
          <br />
          Foo City, CA 12345
          <br />
          <Link href='#'>(555) 555-5555</Link>
        </Typography>
        <br />
        <Typography variant='p' component='p'>
          Owner: Dan Davidson
        </Typography>
      </Box>
      <Box
        component='footer'
        sx={{
          marginTop: 'auto',
          borderTop: '1px solid #fff',
        }}
      >
        <Box p='1rem'>
          {persist ? (
            <RouterLink to='/dash'>User Dashboard</RouterLink>
          ) : (
            <RouterLink to='/login'>Login User</RouterLink>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default Public;
