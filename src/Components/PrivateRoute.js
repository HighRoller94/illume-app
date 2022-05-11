import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useStateValue } from '../StateProvider';

function PrivateRoute({ component: Component, ...rest }) {
    const [{ user }, dispatch] = useStateValue();
    console.log(user)
    return (
    <Route
        {...rest}
        render={props => {
            return user ? <Component {...props} /> : <Redirect to="/login" />
        }} 
        >

        </Route>
    )
}

export default PrivateRoute