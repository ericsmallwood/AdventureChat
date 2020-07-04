import React, {useState} from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import {LoginService} from "../../services/login.service";
import {loadUser, setToken, toggleLoggedIn} from "../../redux/actions";
import {useDispatch} from "react-redux";

export default function RegistrationModal(props) {
    const dispatch = useDispatch();
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [birthday, setBirthday] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function handleRegistration() {
        LoginService
            .register({user: {firstname, lastname, birthday, email, username}, password: password})
            .then(result => {
                localStorage.setItem('user', JSON.stringify(result.user));
                localStorage.setItem('token', result.token);
                dispatch(setToken(result.token));
                dispatch(loadUser(result.user));
                dispatch(toggleLoggedIn(true));
                props.setOpen(false);
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <Dialog open={props.open} onClose={() => props.setOpen(false)}>
            <DialogTitle style={{textAlign: 'center', width: '350px'}}>
                    <span
                        style={{
                            fontFamily: 'Rellanic',
                            fontSize: '30px',
                            fontWeight: 'bold'
                        }}
                    >
                        Register
                    </span>
            </DialogTitle>
            <div style={{margin: '0 10px 10px 10px'}}>
                <div style={{marginBottom: '5px'}}>
                    <TextField
                        style={{width: '100%'}}
                        label='First Name'
                        variant="outlined"
                        onChange={($event) => {
                            setFirstname($event.target.value)
                        }}
                    />
                </div>
                <div style={{marginBottom: '5px'}}>
                    <TextField
                        style={{width: '100%'}}
                        label='Last Name'
                        variant="outlined"
                        onChange={($event) => {
                            setLastname($event.target.value)
                        }}
                    />
                </div>
                <div style={{marginBottom: '5px'}}>
                    <TextField
                        style={{width: '100%'}}
                        label='Birthday'
                        variant="outlined"
                        onChange={($event) => {
                            setBirthday($event.target.value)
                        }}
                    />
                </div>
                <div style={{marginBottom: '5px'}}>
                    <TextField
                        style={{width: '100%'}}
                        label='Email'
                        variant="outlined"
                        onChange={($event) => {
                            setEmail($event.target.value)
                        }}
                    />
                </div>
                <div style={{marginBottom: '5px'}}>
                    <TextField
                        style={{width: '100%'}}
                        label='Username'
                        variant="outlined"
                        onChange={($event) => {
                            setUsername($event.target.value)
                        }}
                    />
                </div>
                <div style={{marginBottom: '5px'}}>
                    <TextField
                        style={{width: '100%'}}
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
                    onClick={handleRegistration}
                >
                    Register
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    style={{
                        fontFamily: 'Rellanic',
                        width: '100%',
                        fontWeight: 'bold'
                    }}
                    onClick={() => props.setOpen(false)}
                >
                    Cancel
                </Button>
            </div>
        </Dialog>
    );
}
