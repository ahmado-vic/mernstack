import jwt_decode from 'jwt-decode';
import { useSelector } from 'react-redux';
import { selectCurrentToken } from '../features/auth/authSlice';

function useAuth() {
  const token = useSelector(selectCurrentToken);
  let isManager = false;
  let isAdmin = false;
  let status = 'Employee';

  if (token) {
    const { id, username, roles } = jwt_decode(token);
    isManager = roles.includes('Manager');
    isAdmin = roles.includes('Admin');

    if ((isManager && isAdmin) || isManager) status = 'Manager';
    if (isAdmin && !isManager) status = 'Admin';

    return { id, username, roles, isManager, isAdmin, status };
  }

  return { id: '', username: '', roles: [], isManager, isAdmin, status };
}

export default useAuth;
