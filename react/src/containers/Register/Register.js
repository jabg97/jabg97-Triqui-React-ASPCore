import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { tipoActions } from '../../actions';
import { base } from '../../hocs';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

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

class Register extends React.Component {
    async componentDidMount() {
       try {
            this.props.showLoading();
            await this.props.getTipos();
        } catch (error) {
            this.props.showSnackBar(error.message);
        } finally {
            this.props.hideLoading();
        }
    }
    async  handleSubmit(event) {
        try {
            event.preventDefault();
            if (event.target.nombre.value && event.target.apellido.value &&
                event.target.email.value && event.target.contrasena.value &&
                event.target.tipoIdentificacionId.value && 
                event.target.numeroIdentificacion.value) {
                    if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(event.target.email.value)) {
                        if (event.target.contrasena.value.length > 7) {
                        let response = await httpClient.post('api/Auth/Register',{
                        nombre: event.target.nombre.value,
                        apellido: event.target.apellido.value,
                        email: event.target.email.value,
                        contrasena: event.target.contrasena.value});
                        console.log(response);
                        if (response.status == 200){                            
                            authProvider.login();
                            this.props.history.push('/dashboard');
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
    render() {
        return authGuard.isAuthenticated() ? (
            <Redirect
                to={{
                    pathname: '/dashboard',
                    state: { from: '/register' },
                }}
            />
        ) : (
            <Container component="main" maxWidth="xs">
                <div>
                    <Avatar >
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Registrarse
                    </Typography>
                    <form
                       
                        onSubmit={this.handleSubmit}
                        noValidate
                    >
                        <InputLabel id="tipoLabel">Tipo Identificacion</InputLabel>
             <Select             
              labelId="tipoLabel"  
                            required
                            fullWidth
                            defaultValue="CC"
                            
                              name="tipoIdentificacionId"
                              id= "tipoIdentificacionId"
                           
                        >
             {this.props.tipos.map(item => (
                 <MenuItem key={item.codigo} value={item.id}>{item.nombre}</MenuItem>
                    ))}
                         </Select>
                         <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="numeroIdentificacion"
                            label="Numero Identificacion"
                            name="numeroIdentificacion"
                            type="text"
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="nombre"
                            label="Nombre"
                            name="nombre"
                            type="text"
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="apellido"
                            label="Apellido"
                            name="apellido"
                            type="text"
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            type="email"
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
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                       
                        >
                            Registrarse
                        </Button>
                    </form>
                </div>
            </Container>
        );
    }
}


const mapStateToProps = state => ({
    tipos: state.tipo.list,
});

const mapDispatchToProps = dispatch => {
    return {
        getTipos: async () => {
            await dispatch(tipoActions.getTipos());          
        },
    };
};


Register.propTypes = {
    tipos: PropTypes.arrayOf(PropTypes.object).isRequired,
    getTipos: PropTypes.func.isRequired,
    showSnackBar: PropTypes.func.isRequired,
    showLoading: PropTypes.func.isRequired,
    hideLoading: PropTypes.func.isRequired,
};
export default base(connect(mapStateToProps, mapDispatchToProps)(Register));
