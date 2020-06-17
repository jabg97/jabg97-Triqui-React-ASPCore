import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import UserAccountMenu from '../../../components/UserAccountMenu';
import { authGuard } from '../../../utils';

const LinkMaterial = React.forwardRef((props, ref) => (
    <RouterLink innerRef={ref} {...props} />
));

/*const sections = [
    'Technology',
    'Design',
    'Culture',
    'Business',
    'Politics',
    'Opinion',
    'Science',
    'Health',
    'Style',
    'Travel',*/
    const sections = [
];

const Header = props => {
    const { classes } = props;
    return (
        <>
            <Toolbar className={classes.toolbar}>
                <Button
                    variant="outlined"
                    size="small"
                    component={LinkMaterial}
                    to="/"
                >
                    <IconButton>
                    <HomeIcon />
                </IconButton>
                    Página Principal
                </Button>

                <Typography
                    component="h2"
                    variant="h5"
                    color="inherit"
                    align="center"
                    noWrap
                    className={classes.toolbarTitle}
                ></Typography>
                
                {authGuard.isAuthenticated() ? (
                    <>
                        <Button
                            variant="outlined"
                            size="small"
                            component={LinkMaterial}
                            to="/dashboard"
                        >
                            Dashbaord
                        </Button>
                        <UserAccountMenu {...props} />
                    </>
                ) : (
                    <div>
                    <Button
                        variant="outlined"
                        size="small"
                        component={LinkMaterial}
                        to="/register"
                    >
                        Registrarse
                    </Button>
                    <Button
                        variant="outlined"
                        size="small"
                        component={LinkMaterial}
                        to="/login"
                    >
                        Iniciar Sesión
                    </Button>
                    </div>
                )}
            </Toolbar>
            <Toolbar
                component="nav"
                variant="dense"
                className={classes.toolbarSecondary}
            >
                {sections.map(section => (
                    <Link
                        color="inherit"
                        noWrap
                        key={section}
                        variant="body2"
                        href="#"
                        className={classes.toolbarLink}
                    >
                        {section}
                    </Link>
                ))}
            </Toolbar>
        </>
    );
};

Header.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default Header;
