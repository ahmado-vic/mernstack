import DashFooter from './DashFooter';
import DashHeader from './DashHeader';
import Layout from './Layout';
import { Box } from '@mui/material';

function Dashboard() {
  return (
    <>
      <DashHeader />
      <Box>
        <Layout />
      </Box>
      <DashFooter />
    </>
  );
}

export default Dashboard;
