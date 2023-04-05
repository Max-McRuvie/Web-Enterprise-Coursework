import React, { useState} from 'react';
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
import auth from '../features/auth/auth-helper';
import { signout } from '../features/auth/auth-api.js';
import { useNavigate } from "react-router-dom";

const { main, darkNavbar, light, contrastText } = theme.palette.primary;

const StyledButton = styled(Button)(({ theme, color = 'primary' }) => ({
    ':hover': {
      backgroundColor: light,
        color: darkNavbar,
    },
}));

export default function Root() {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(auth.isAuthenticated());
    const [isAdmin, setIsAdmin] = useState(auth.isAdmin());

    isAdmin ? console.log("Admin") : console.log("Not Admin");

    const handleLogout = () => {
        signout().then((response) => {
            auth.clearToken(() => console.log("signed out"))
        })
        setIsLoggedIn(false);
        setIsAdmin(false);
        navigate('/login');
    };

    const loginDisplay = isLoggedIn ? (
        <StyledButton variant="raised" onClick={handleLogout}>Logout</StyledButton>
    ) : (
        <StyledButton variant="raised" href="/login">Login</StyledButton>
    );

    const signupDisplay = isLoggedIn ? (
        <StyledButton variant="raised" href="/profile">Profile</StyledButton>
    ) : (
        <StyledButton variant="raised" href="/signup">Sign Up</StyledButton>
    );

    // const authCheck = auth.isAuthenticated()

    // let loginDisplay = <StyledButton variant='raised' href='/login'>Login</StyledButton>;
    // let signupDisplay = <StyledButton variant='raised' href='/signup'>Sign Up</StyledButton>;

    // if (authCheck) {
    //     loginDisplay = <StyledButton variant='raised' href='/logoff'>Logout</StyledButton>;
    //     signupDisplay = <StyledButton variant='raised' href='/profile'>Profile</StyledButton>;
    // }

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
                            {isLoggedIn ? (
                                <>
                                <StyledButton color="inherit" variant="raised" href="/">Home</StyledButton>
                                <StyledButton color="inherit" variant="raised" href="/quote">Get Quote</StyledButton>
                                <StyledButton color="inherit" variant="raised" href="/quote-list">Quote List</StyledButton>
                                </>
                            ) : (
                                <StyledButton color="inherit" variant="raised" href="/">Home</StyledButton>
                            )}
                        </div>
                        <div styles={{direction:"row"}}>
                            { isAdmin ? (
                                <StyledButton color="inherit" variant="raised" href="/admin">Admin</StyledButton>   
                            ) : (
                                <></>
                            )}
                            {loginDisplay}
                            {signupDisplay}
                        </div>
                    </Toolbar>
                </AppBar>
                <Outlet isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            </Box>
        </ThemeProvider>
    );
}