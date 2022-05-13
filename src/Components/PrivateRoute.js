import React, { useEffect } from 'react';
import { auth } from '../firebase';
import { Navigate, Outlet } from 'react-router-dom';
import { useStateValue } from '../StateProvider';

function PrivateRoute({ children }) {
    const [{ user }, dispatch] = useStateValue();

    if (!user) {
        return <Navigate to="/login" replace />;
    }
    
    return children ? children : <Outlet />;
}

export default PrivateRoute