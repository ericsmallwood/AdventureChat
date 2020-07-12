import React, { useState } from 'react';
import './header.css';
import Logo from './../../resources/images/logo.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { toggleLoggedIn } from '../../redux/actions';
import LoginModal from './loginModal';
import RegistrationModal from './registrationModal';
import { PropTypes } from '@material-ui/core';

function LoggedOut (props) {
  return (
    <div className='header-menu'>
      <span className='header-link' onClick={() => props.setOpenLogin(true)}>Login</span>
      <span className='header-link' onClick={() => props.setOpenRegistration(true)}>Register</span>
    </div>
  );
}

LoggedOut.propTypes = {
  setOpenLogin: PropTypes.func,
  setOpenRegistration: PropTypes.func
};

function LoggedIn (props) {
  return (
    <div className='header-menu'>
      <span className='header-link'>Welcome Back, {props.user.firstname}</span>
      <span className='header-link' onClick={() => {
        localStorage.clear();
        props.dispatch(toggleLoggedIn(false));
      }}>Log Out</span>
    </div>
  );
}

LoggedIn.propTypes = {
  user: PropTypes.any,
  dispatch: PropTypes.func
};

export default function Header () {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.auth.loggedIn);
  const user = useSelector(state => state.user.user);
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegistration, setOpenRegistration] = useState(false);

  const headerMenu = isLoggedIn
    ? <LoggedIn user={user} dispatch={dispatch}/>
    : <LoggedOut dispatch={dispatch} setOpenLogin={setOpenLogin} setOpenRegistration={setOpenRegistration}/>;

  return (
    <div className='header'>
      <img src={Logo} className='header-logo' alt='logo'/>
      {headerMenu}
      <LoginModal open={openLogin} setOpen={setOpenLogin} />
      <RegistrationModal open={openRegistration} setOpen={setOpenRegistration} />
    </div>
  );
}
