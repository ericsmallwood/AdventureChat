import React, {useEffect, useState} from 'react';
import './header.css'
import Logo from './../../resources/images/logo.jpg'
import {useDispatch, useSelector} from "react-redux";
import {LOAD_USER, SET_TOKEN, TOGGLE_LOGGED_IN} from "../../redux/actionTypes";
import {editUser, loadUser, setToken, toggleLoggedIn} from "../../redux/actions";
import {Modal} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {LoginService} from "../../services/login.service";
import LoginModal from "./loginModal";
import RegistrationModal from "./registrationModal";


function LoggedOut(props) {
    return (
      <div className='header-menu'>
          <span className='header-link' onClick={() => props.setOpenLogin(true)}>Login</span>
          <span className='header-link' onClick={() => props.setOpenRegistration(true)}>Register</span>

      </div>
    );
}

function LoggedIn(props) {
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

export default function Header() {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.auth.loggedIn);
    const user = useSelector(state => state.user.user);
    const [openLogin, setOpenLogin] = useState(false);
    const [openRegistration, setOpenRegistration] = useState(false);


    //todo: getUserData
    useEffect(() => null, [])

    const headerMenu = isLoggedIn
        ? <LoggedIn user={user} dispatch={dispatch}/>
        : <LoggedOut dispatch={dispatch} setOpenLogin={setOpenLogin} setOpenRegistration={setOpenRegistration}/>

    return (
        <div className='header'>
            <img src={Logo} className='header-logo' alt='logo'/>
            {headerMenu}
            <LoginModal open={openLogin} setOpen={setOpenLogin} />
            <RegistrationModal open={openRegistration} setOpen={setOpenRegistration} />
        </div>
    )
}
