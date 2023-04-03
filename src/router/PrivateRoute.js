import { Navigate } from 'react-router-dom';
import React from 'react';
import auth from '../features/auth/auth-helper';

export default function PrivateRoute({ children }) {
    if (!auth.isAuthenticated()) {
        console.log("Not logged in!")
        // not logged in so redirect to login page with the return url
        return <Navigate to="/login" />;
    }

    // authorized so return child components
    return children;
}
