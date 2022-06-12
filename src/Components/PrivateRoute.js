import React from 'react';
import { auth } from '../firebase';
import { Navigate, Outlet } from 'react-router-dom';
import { useStateValue } from '../StateProvider';

export default function PrivateRoute({ children }) {
    const [{ user }, dispatch] = useStateValue();

    return user ? children : <Navigate to="login" />;
}