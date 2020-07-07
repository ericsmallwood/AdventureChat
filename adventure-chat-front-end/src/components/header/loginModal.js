import React, {useState} from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import {AccountService} from "../../services/account.service";
import {loadUser, setToken, toggleLoggedIn} from "../../redux/actions";
import {useDispatch} from "react-redux";

export default function LoginModal(props) {
    const dispatch = useDispatch();
    const [userName, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function handleLogin() {
        AccountService
            .login(userName, password)
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
            <DialogTitle style={{textAlign: 'center'}}>
                    <span style={{fontFamily: 'Rellanic', fontSize: '30px', fontWeight: 'bold'}}>
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
                    onClick={() => props.setOpen(false)}
                >
                    Cancel
                </Button>
            </div>
        </Dialog>
    );
}
