import useTitle from '../../hooks/useTitle';
import NewUserForm from '../users/NewUserForm';

function NewUser() {
  useTitle('New User');
  return (
    <>
      <NewUserForm />
    </>
  );
}

export default NewUser;
