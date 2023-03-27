import React from 'react';
import { Outlet } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import theme from '../theme';
import { ThemeProvider } from '@mui/material/styles';
import {useSelector, useDispatch} from 'react-redux';
import { getAuthBool } from '../state/auth/authReducer';
import { setAuthBool, unsetAuthBool } from '../state/auth/authReducer';
import store from '../state/store';
import { styled } from '@mui/material/styles';



const { main, darkNavbar, light, contrastText } = theme.palette.primary;

const StyledButton = styled(Button)(({ theme, color = 'primary' }) => ({
    ':hover': {
      backgroundColor: light,
        color: darkNavbar,
    },
}));


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

    let loginDisplay = <StyledButton variant='raised' href='/login'>Login</StyledButton>;
    let signupDisplay = <StyledButton variant='raised' href='/signup'>Sign Up</StyledButton>;

    if (useSelector(getAuthBool)) {
        loginDisplay = <StyledButton variant='raised' href='/logoff'>Logout</StyledButton>;
        signupDisplay = <StyledButton variant='raised' href='/profile'>Profile</StyledButton>;
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
                            <StyledButton color="inherit" variant='raised' href='/'>Home</StyledButton>
                            <StyledButton color="inherit" variant='raised' href='/quote'>Get Quote</StyledButton>
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