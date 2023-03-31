import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import PrivateRoute from "./router/PrivateRoute";
import Root from "./router/root";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Logoff from "./pages/Logoff";
import Quote from './pages/Quote';
import QuoteList from './pages/QuoteList';
import Profile from './pages/Profile';


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
        element: <Quote />,
      },
      {
        path: "/quote-list",
        element: <QuoteList />,
      },
      {
        path: "/profile",
        element: <Profile />,
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
        path: "/logoff",
        element: 
          <PrivateRoute>,
            <Logoff />,
          </PrivateRoute>
        
      }
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