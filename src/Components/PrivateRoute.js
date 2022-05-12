import React from 'react';
import { Navigate } from 'react-router-dom';
import { useStateValue } from '../StateProvider';

function PrivateRoute({ children }) {
    const [{ user }, dispatch] = useStateValue();

    if (!user) {
        return <Navigate to="/login" replace />;
    }
    return children;
}

export default PrivateRoute