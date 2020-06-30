import React, {useEffect, useState} from 'react';
import './header.css'
import Logo from './../../resources/images/logo.jpg'
import {useDispatch, useSelector} from "react-redux";
import {TOGGLE_LOGGED_IN} from "../../redux/actionTypes";
import {editUser, toggleLoggedIn} from "../../redux/actions";


function LoggedOut(props) {
    return (
      <div className='header-menu'>
          <span className='header-link' onClick={() => props.dispatch(toggleLoggedIn(true))}>Login</span>
          <span className='header-link'>Register</span>
      </div>
    );
}

function LoggedIn(props) {
    return (
        <div className='header-menu'>
            <span className='header-link'>Welcome Back, {props.user.firstName}</span>
            <span className='header-link' onClick={() => props.dispatch(toggleLoggedIn(false))}>Log Out</span>
        </div>
    );
}

export default function Header() {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.loggedIn);
    const [user, setUser] = useState({firstName: 'User', lastName: 'User'});

    //todo: getUserData
    useEffect(() => null, [])

    const headerMenu = isLoggedIn ? <LoggedIn user={user} dispatch={dispatch}/> : <LoggedOut dispatch={dispatch}/>

    return (
        <div className='header'>
            <img src={Logo} className='header-logo' alt='logo'/>
            {headerMenu}
        </div>
    )
}
