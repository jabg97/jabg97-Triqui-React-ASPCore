import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Dashboard from '../containers/Dashboard';
import Home from '../containers/Home';
import Login from '../containers/Login';
import Register from '../containers/Register';
import NotFound from '../components/NotFound';
import { AdminLayout, HomeLayout } from '../layouts';
import { authGuard } from '../utils';

class AppRouter extends Component {
    componentDidMount() {}

    render() {
        return (
            <Switch>
                <PublicRoute
                    path="/register"
                    component={Register}
                    layout={HomeLayout}
                />
                 <PublicRoute
                    path="/login"
                    component={Login}
                    layout={HomeLayout}
                />
                <PrivateRoute
                    path="/dashboard"
                    component={Dashboard}
                    layout={AdminLayout}
                />
              
                <PublicRoute
                    exact
                    path="/"
                    component={Home}
                    layout={HomeLayout}
                />
                <PublicRoute path="*" component={NotFound} />
            </Switch>
        );
    }
}
export default AppRouter;

const PublicRoute = props => {
    return <AppRouteLayout {...props} />;
};

const PrivateRoute = props => {
    return authGuard.isAuthenticated() ? (
        <AppRouteLayout {...props} />
    ) : (
        <Redirect
            to={{
                pathname: '/login',
                state: { from: props.location },
            }}
        />
    );
};

// eslint-disable-next-line no-shadow
const AppRouteLayout = ({ component: Component, layout: Layout, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props => {
                if (Layout) {
                    return (
                        <Layout>
                            <Component {...props} />
                        </Layout>
                    );
                }
                return <Component {...props} />;
            }}
        />
    );
};

PrivateRoute.propTypes = {
    location: PropTypes.object,
};

AppRouteLayout.propTypes = {
    component: PropTypes.elementType.isRequired,
    layout: PropTypes.elementType,
};
