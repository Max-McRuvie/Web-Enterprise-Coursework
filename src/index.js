import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// Import root and pages
import Root from "./router/root.js";
import ErrorPage from "./pages/ErrorPage.js";
import Home from "./pages/Home.js";
import Signup from "./pages/Signup.js";
import Login from "./pages/Login.js";
import Quote from './pages/Quote.js';
import EditQuote from './pages/EditQuote.js';
import QuoteList from './pages/QuoteList.js';
import Profile from './pages/Profile.js';
import Admin from './pages/Admin.js';

// Import PrivateRoute and AdminRoute
import PrivateRoute from "./router/PrivateRoute.js";
import AdminRoute from './router/AdminRoute.js'

// Router
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/quote",
        element: (
          <PrivateRoute>
            <Quote />
          </PrivateRoute>
        ),
      },
      {
        path: "/quote/:quoteId",
        element: (
          <PrivateRoute>
            <EditQuote />
          </PrivateRoute>
        ),
      },
      {
        path: "/quote-list",
        element: (
          <PrivateRoute>
            <QuoteList />
          </PrivateRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/admin",
        element: (
          <AdminRoute>
            <Admin />
          </AdminRoute>
        ),
      },
    ],
  },

]);

// Render
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);