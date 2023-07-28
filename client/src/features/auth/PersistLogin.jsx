import React, { useEffect, useRef, useState } from 'react';
import { useRefreshMutation } from './authApiSlice';
import { useSelector } from 'react-redux';
import { selectCurrentToken } from './authSlice';
import usePersist from '../../hooks/usePersist';
import { Outlet } from 'react-router-dom';
import { Typography } from '@mui/material';

function PersistLogin() {
  let content;
  const token = useSelector(selectCurrentToken);
  const [persist] = usePersist();
  const [refresh, { isLoading, isUninitialized, isSuccess, isError, error }] =
    useRefreshMutation();
  const [trueSuccess, setTrueSuccess] = useState(false);
  const effectRan = useRef(false);

  useEffect(() => {
    if (effectRan.current === true || process.env.NODE_ENV === 'development') {
      const verifyRefreshToken = async () => {
        try {
          await refresh();
          setTrueSuccess(true);
        } catch (error) {
          console.log(error);
        }
      };

      if (!token && persist) verifyRefreshToken();
    }

    return () => (effectRan.current = true);
  }, []);

  if (!persist) {
    console.log('no persist');
    content = <Outlet />;
  } else if (isLoading) {
    console.log('loading...');
    content = (
      <Typography variant='p' component='p'>
        loading...
      </Typography>
    );
  } else if (isError) {
    console.log('error');
    content = (
      <Typography
        variant='p'
        component='p'
        color='#fff'
        backgroundColor='red'
        padding='0rem 1rem'
      >
        {error?.data?.message}
      </Typography>
    );
  } else if (isSuccess && trueSuccess) {
    console.log('success');
    content = <Outlet />;
  } else if (token && isUninitialized) {
    console.log('token and uninit');
    content = <Outlet />;
  }

  return content;
}

export default PersistLogin;
