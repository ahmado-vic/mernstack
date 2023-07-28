import { Box, List, ListItem, Typography, styled } from '@mui/material';
import { Link } from 'react-router-dom';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import useAuth from '../hooks/useAuth';
import useTitle from '../hooks/useTitle';

const StyledListItem = styled(ListItem)({
  '& > a': {
    display: 'flex',
    alignItems: 'center',
  },
});

function Welcome() {
  useTitle('Dashboard');

  const { username, isAdmin, isManager } = useAuth();
  const date = new Intl.DateTimeFormat('en-Us', {
    dateStyle: 'long',
    timeStyle: 'long',
  }).format(Date.now());
  return (
    <Box paddingLeft='1rem' marginTop='2rem'>
      <Typography variant='h5' components='h5' paddingBottom='1.5rem'>
        Welcome {username}
      </Typography>
      <Typography variant='h6' component='h6' paddingBottom='1.5rem'>
        {date}
      </Typography>
      <List>
        <StyledListItem>
          <Link to='/dash/notes/new'>
            <KeyboardDoubleArrowRightIcon />
            Create New Note
          </Link>
        </StyledListItem>
        <StyledListItem>
          <Link to='/dash/notes'>
            <KeyboardDoubleArrowRightIcon />
            View Tech-Notes
          </Link>
        </StyledListItem>
        <StyledListItem>
          {isAdmin || isManager ? (
            <Link to='/dash/users/new'>
              <KeyboardDoubleArrowRightIcon />
              Create New User
            </Link>
          ) : (
            ''
          )}
        </StyledListItem>
        <StyledListItem>
          {isAdmin || isManager ? (
            <Link to='/dash/users'>
              <KeyboardDoubleArrowRightIcon />
              View Users Settings
            </Link>
          ) : (
            ''
          )}
        </StyledListItem>
      </List>
    </Box>
  );
}

export default Welcome;
