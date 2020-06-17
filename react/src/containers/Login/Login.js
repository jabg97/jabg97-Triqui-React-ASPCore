import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Redirect } from 'react-router-dom';
import { useHistory, authProvider, authGuard, httpClient } from '../../utils';

const useStyles = makeStyles(theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
        },
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const Login = () => {
    const classes = useStyles();
    const history = useHistory();

    async function handleSubmit(event) {
        try {
            event.preventDefault();
            if (event.target.email.value && event.target.contrasena.value) {
                if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(event.target.email.value)) {
                    if (event.target.contrasena.value.length > 7) {
                         let response = await httpClient.post('api/Auth/Login',{
                        email: event.target.email.value,
                        contrasena: event.target.contrasena.value}); 
                        console.log(response);
                        if (response.status == 200){   
                            authProvider.login();
                            history.push("/dashboard") 
                        }else if (response.status == 404){  
                            alert(response.message);
                        }else if (response.status == 500){  
                            alert(response.message);
                        }
                    }else{
                        alert("Minimo 8 caracteres para la contraseña.");
                    }     
                    }else{
                        alert("Email con formato incorrecto.");
                    }             
        }else{
            alert("Formulario incompleto.");
        }
                } catch (error) {
                    alert(error.message);
                } 
    }
    return authGuard.isAuthenticated() ? (
        <Redirect
            to={{
                pathname: '/dashboard',
                state: { from: '/login' },
            }}
        />
    ) : (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Log in
                </Typography>
                <form
                    className={classes.form}
                    onSubmit={handleSubmit}
                    noValidate
                >
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="contrasena"
                        label="Contraseña"
                        type="password"
                        id="contrasena"
                        autoComplete="current-password"
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Recuerdame"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Iniciar sesión
                    </Button>
                </form>
            </div>
        </Container>
    );
};

export default Login;
