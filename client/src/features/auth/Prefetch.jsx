import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { store } from '../../app/Store';
import { notesApiSlice } from '../notes/notesApiSlice';
import { usersApiSlice } from '../users/usersApiSlice';

function Prefetch() {
  useEffect(() => {
    store.dispatch(
      notesApiSlice.util.prefetch('getNotes', undefined, { force: true })
    );
    store.dispatch(
      usersApiSlice.util.prefetch('getUsers', undefined, { force: true })
    );
  }, []);

  return <Outlet />;
}

export default Prefetch;
