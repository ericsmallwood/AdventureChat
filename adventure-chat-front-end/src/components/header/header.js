import React, {useEffect, useState} from 'react';
import './header.css'
import Logo from './../../resources/images/logo.jpg'

function LoggedOut() {
    return (
      <div className='header-menu'>
          <span className='header-link'>Login</span>
          <span className='header-link'>Register</span>
      </div>
    );
}

function LoggedIn(props) {
    return (
        <div className='header-menu'>
            <span className='header-link'>Welcome Back, {props.user.firstName}</span>
        </div>
    );
}

export default function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState({firstName: 'User', lastName: 'User'});

    //todo: getUserData
    useEffect(() => null, [])

    const headerMenu = isLoggedIn ? <LoggedIn user={user}/> : <LoggedOut />

    return (
        <div className='header'>
            <img src={Logo} className='header-logo' alt='logo'/>
            {headerMenu}
        </div>
    )
}
