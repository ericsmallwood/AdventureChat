import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser, setToken, toggleLoggedIn } from '../redux/actions';

export default function DataLoader (props) {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.auth.loggedIn);

  const localStorageToken = localStorage.getItem('token');
  const localStorageUser = localStorage.getItem('user');
  if (!isLoggedIn && localStorageToken && localStorageUser) {
    dispatch(setToken(localStorageToken));
    dispatch(loadUser(localStorageUser));
    dispatch(toggleLoggedIn(true));
  }

  return (
    <>
    </>
  );
}
