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


function LoggedOut(props) {
    return (
      <div className='header-menu'>
          <span className='header-link' onClick={() => props.setOpen(true)}>Login</span>
          <span className='header-link'>Register</span>

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
    const user = useSelector(state => {
        return state.user.user
    });
    const [open, setOpen] = useState(false);
    const [userName, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function handleLogin() {
        LoginService
            .login(userName, password)
            .then(result => {
               console.log(result);
               localStorage.setItem('user', JSON.stringify(result.user));
                localStorage.setItem('token', result.token);
                dispatch(setToken(result.token));
                dispatch(loadUser(result.user));
                dispatch(toggleLoggedIn(true));
                setOpen(false);
            })
            .catch(error => {
                console.log(error);
            });
    }

    //todo: getUserData
    useEffect(() => null, [])

    const headerMenu = isLoggedIn ? <LoggedIn user={user} dispatch={dispatch}/> : <LoggedOut dispatch={dispatch} setOpen={setOpen}/>

    return (
        <div className='header'>
            <img src={Logo} className='header-logo' alt='logo'/>
            {headerMenu}
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle style={{textAlign: 'center'}}>
                    <span
                        style={{
                            fontFamily: 'Rellanic',
                            fontSize: '30px',
                            fontWeight: 'bold'
                        }}
                    >
                        Login
                    </span>
                </DialogTitle>
                <div style={{margin: '0 10px 10px 10px'}}>
                    <div style={{marginBottom: '5px'}}>
                        <TextField
                            label='Username'
                            variant="outlined"
                            onChange={($event) => {
                                setUsername($event.target.value)
                            }}
                        />
                    </div>
                    <div style={{marginBottom: '5px'}}>
                        <TextField
                            label='Password'
                            variant="outlined"
                            onChange={($event) => {
                                setPassword($event.target.value)
                            }}
                        />
                    </div>
                    <Button
                        variant="contained"
                        style={{
                            fontFamily: 'Rellanic',
                            backgroundColor: '#FEDB01',
                            width: '100%',
                            fontWeight: 'bold',
                            marginBottom: '5px'
                        }}
                        onClick={handleLogin}
                    >
                        Login
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        style={{
                            fontFamily: 'Rellanic',
                            width: '100%',
                            fontWeight: 'bold'
                        }}
                        onClick={() => setOpen(false)}
                    >
                        Cancel
                    </Button>
                </div>
            </Dialog>
        </div>
    )
}
