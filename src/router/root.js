import React from 'react';
import { Outlet } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import theme from '../theme';
import { ThemeProvider } from '@mui/material/styles';
import {useSelector, useDispatch} from 'react-redux';
import { getAuthBool } from '../state/user/userReducer';
import { setAuthBool, unsetAuthBool } from '../state/user/userReducer';
import store from '../state/store';


const { main, darkNavbar, light, contrastText } = theme.palette.primary;

export default function Root() {
    const dispatch = useDispatch();
    const authUser = sessionStorage.getItem('auth');
    if (authUser) {
      dispatch(setAuthBool())
      console.log(store.getState())
    }else {
      dispatch(unsetAuthBool())
      console.log(store.getState())
    }

    let loginDisplay = <Button href='/login'>Login</Button>;
    let signupDisplay = <Button href='/signup'>Sign Up</Button>;

    if (useSelector(getAuthBool)) {
        loginDisplay = <Button href='/logoff'>Logout</Button>;
        signupDisplay = <Button href='/profile'>Profile</Button>;
    }

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" sx={{background: darkNavbar}}>
                    <Toolbar sx={{justifyContent: 'space-between'}}>
                        <div styles={{direction:"row"}}>
                            {/* <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{ mr: 2 }}
                            >
                                <MenuIcon />
                            </IconButton> */}
                            <Button color="inherit" href='/'>Home</Button>
                        </div>
                        <div styles={{direction:"row"}}>
                            {loginDisplay}
                            {signupDisplay}
                        </div>
                    </Toolbar>
                </AppBar>
                <Outlet />
            </Box>
        </ThemeProvider>
    );
}