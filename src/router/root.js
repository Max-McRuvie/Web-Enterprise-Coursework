import React from 'react';
import { Outlet } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import theme from '../theme';
import { ThemeProvider } from '@mui/material/styles';
const { main, darkNavbar, light, contrastText } = theme.palette.primary;


export default function Root() {
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
                            <Button color="inherit" href='/login'>Login</Button>
                            <Button color="inherit" href='/signup'>Sign Up</Button>
                        </div>
                    </Toolbar>
                </AppBar>
                <Outlet />
            </Box>
        </ThemeProvider>
    );
}