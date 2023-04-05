import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


import Root from "./router/root";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Quote from './pages/Quote';
import EditQuote from './pages/EditQuote';
import QuoteList from './pages/QuoteList';
import Profile from './pages/Profile';
import Admin from './pages/Admin';

import PrivateRoute from "./router/PrivateRoute";
import AdminRoute from './router/AdminRoute'

import store from './state/store';
import { Provider } from 'react-redux';

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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);