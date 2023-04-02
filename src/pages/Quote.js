import React from 'react'
import theme from '../theme';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import QuoteForm from '../components/QuoteForm';

const { main, light, darkNavbar, contrastText } = theme.palette.primary;

const StyledButton = styled(Button)(({ theme, color = 'primary' }) => ({
    backgroundColor: darkNavbar,
    ':hover': {
      backgroundColor: light,
        color: darkNavbar,
    },
}));

const Quote = () => {
    return (
        <QuoteForm edit={false} />
    )
}

export default Quote