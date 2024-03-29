// Description: This is the main dashboard for the admin page. It contains the paygrade form and the fudge factor form.

// Imports
import React, { useEffect, useState } from "react";
import { Button, Container, Grid, Typography } from "@mui/material";

// Component Imports
import PaygradeForm from "./PaygradeForm.js";

// Feature Imports
import { getPaygradeSettings, adjustPayGrades } from "../../features/admin/admin-api.js";

// Component
const Dashboard = () => {
  const [paygrade, setPaygrade] = useState({
    junior: 0,
    standard: 0,
    senior: 0,
  });

  const [loading, setLoading] = useState(true);


  // This function is used to handle changes to the paygrade form.
  const handleChange = (event, fieldName, fieldType) => {
    if (fieldType === "PaygradeSettings") {
      setPaygrade({
        ...paygrade,
        [fieldName]: event.target.value,
      });
    }
  };

  // This function is used to handle the submission of the paygrade form.
  const handleSubmit = (e, actionType) => {
    e.preventDefault();
    if (actionType === "Paygrade") {
      adjustPayGrades(paygrade);
      alert("Paygrade settings have been updated.")
    }
  };

  useEffect(() => {
    getPaygradeSettings()
    .then((response) => {
      setPaygrade({
        junior: response.junior,
        standard: response.standard,
        senior: response.senior,
      });
      setLoading(false);
    })
  }, []);

  // Render
  return (
    <Container maxWidth="lg" marginBottom={5}>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Grid
          container
          item
          xs={12}
          direction="row"
          justifyContent="center"
          spacing={2}
        >
          <Grid item>
            <PaygradeForm
              handleChange={handleChange}
              paygrade={paygrade}
            />
          </Grid>

          <Grid
            container
            item
            xs={12}
            direction="row"
            justifyContent="center"
            spacing={2}
          >
            <Grid item>
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={(e) => handleSubmit(e, "Paygrade")}
              >
                Submit Paygrade
              </Button>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

// Export
export default Dashboard;
