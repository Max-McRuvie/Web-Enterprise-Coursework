import { Navigate } from 'react-router-dom';
import React from 'react';

export default function PrivateRoute({ children }) {
    const authUser = sessionStorage.getItem('auth');
    if (!authUser) {
        console.log("Not logged in!")
        // not logged in so redirect to login page with the return url
        return <Navigate to="/login" />
    }

    // authorized so return child components
    return children;
}
