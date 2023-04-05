import React from 'react';
import {
    Button,
    Container,
    Grid,
    Paper,
    Typography,
    Box,
    TextField,
} from '@mui/material';
import Text from '@mui/material/Typography';
import { Form } from 'react-router-dom';

import Dashboard from '../components/Admin/Dashboard';

const Admin = () => {
    return (
        <Container maxWidth="lg">
            <Grid container spacing={2} justifyContent="center" marginTop="2%" alignItems="center">
            <Grid item xs={12}>
                <Paper>
                <Box p={2}>
                    <Typography variant="h4">Admin Page</Typography>
                </Box>
                <Box p={2} marginBottom="20px">
                    <Dashboard />
                </Box>
                </Paper>
            </Grid>
            </Grid>
        </Container>
      );
};
    

export default Admin;