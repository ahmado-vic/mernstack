import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Public from './pages/Public';
import Auth from './pages/Auth';
import Dashboard from './components/Dashboard';
import Welcome from './components/Welcome';
import NotesList from './features/notes/NotesList';
import NewNote from './features/notes/NewNote';
import Prefetch from './features/auth/Prefetch';
import EditNote from './features/notes/EditNote';
import UsersList from './features/users/UsersList';
import NewUser from './features/users/NewUser';
import EditUser from './features/users/EditUser';
import PersistLogin from './features/auth/PersistLogin';
import RequireAuth from './features/auth/RequireAuth';
import { ROLES } from './app/Roles';
import NotFound from './components/NotFound';
import useTitle from './hooks/useTitle';

function App() {
  useTitle('DanD WorkShop');
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Public />} />
          <Route path='/login' element={<Auth />} />
          <Route path='*' element={<NotFound />} />

          <Route element={<PersistLogin />}>
            <Route
              element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}
            >
              <Route element={<Prefetch />}>
                <Route path='dash' element={<Dashboard />}>
                  <Route index element={<Welcome />} />

                  <Route path='notes'>
                    <Route index element={<NotesList />} />
                    <Route path='new' element={<NewNote />} />
                    <Route path=':noteId' element={<EditNote />} />
                  </Route>

                  <Route
                    element={
                      <RequireAuth
                        allowedRoles={[ROLES.Admin, ROLES.Manager]}
                      />
                    }
                  >
                    <Route path='users'>
                      <Route index element={<UsersList />} />
                      <Route path='new' element={<NewUser />} />
                      <Route path=':userId' element={<EditUser />} />
                    </Route>
                  </Route>
                </Route>
              </Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
