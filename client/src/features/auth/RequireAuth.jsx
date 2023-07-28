import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

function RequireAuth({ allowedRoles }) {
  const location = useLocation();
  const { roles } = useAuth();
  console.log(location);
  const content = roles.some(role => allowedRoles.includes(role)) ? (
    <Outlet />
  ) : (
    <Navigate to='/login' state={{ from: location }} replace={true} />
  );

  return content;
}

export default RequireAuth;
