// Description: Admin page

// Imports
import React from "react";
import { Container, Grid, Paper, Typography, Box } from "@mui/material";

// Import Components
import Dashboard from "../components/Admin/Dashboard.js";


const Admin = () => {
  return (
    <Container maxWidth="lg">
      <Grid
        container
        spacing={2}
        justifyContent="center"
        marginTop="2%"
        alignItems="center"
      >
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

// Export
export default Admin;
