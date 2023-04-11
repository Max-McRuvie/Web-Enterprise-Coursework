import React from "react";
import { Navigate } from "react-router-dom";
import auth from "../features/auth/auth-helper.js";


export default function AdminRoute({ children }) {
    if (!auth.isAdmin()) {
        alert("You are not authorized to view this page!");
        // not logged in so redirect to login page with the return url
        return <Navigate to="/" />;
    }

    // authorized so return child components
    return children;
}