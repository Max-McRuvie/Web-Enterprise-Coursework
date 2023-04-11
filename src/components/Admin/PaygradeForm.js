// Description: This component is used to display the paygrade form in the admin page

// Imports
import React, { useState } from "react";
import { Grid, Typography, TextField } from "@mui/material";
import { Form } from "react-router-dom";

// Component
const PaygradeForm = ({ handleChange, paygrade }) => {
  const [junior, setJunior] = useState(paygrade.junior);
  const [standard, setStandard] = useState(paygrade.standard);
  const [senior, setSenior] = useState(paygrade.senior);

  const [error, setError] = useState({
    junior: false,
    standard: false,
    senior: false,
  });

  // Render
  return (
    <Grid item xs={12}>
      <Typography marginBottom={"2%"}>
        <Typography variant="h4">Paygrade</Typography>
      </Typography>
      <Form noValidate autoComplete="off">
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <TextField
              label="Junior"
              title="Junior Paygrade"
              value={junior}
              type="number"
              onChange={(e) => {
                let parsedValue = parseFloat(e.target.value);
                if (!isNaN(parsedValue)) {
                  setError({ ...error, junior: false });
                  setJunior(e.target.value);
                  handleChange(e, "junior", "PaygradeSettings");
                } else {
                  setError({ ...error, junior: true });
                }
              }}
              error={error.junior}
              helperText={error.junior ? "Please enter a number" : ""}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Standard"
              title="Standard Paygrade"
              value={standard}
              type="number"
              onChange={(e) => {
                let parsedValue = parseFloat(e.target.value);
                if (!isNaN(parsedValue)) {
                  setError({ ...error, standard: false });
                  setStandard(e.target.value);
                  handleChange(e, "standard", "PaygradeSettings");
                } else {
                  setError({ ...error, standard: true });
                }
              }}
              error={error.standard}
              helperText={error.standard ? "Please enter a number" : ""}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Senior"
              title="Senior Paygrade"
              value={senior}
              type="number"
              onChange={(e) => {
                let parsedValue = parseFloat(e.target.value);
                if (!isNaN(parsedValue)) {
                  setError({ ...error, senior: false });
                  setSenior(e.target.value);
                  handleChange(e, "senior", "PaygradeSettings");
                } else {
                  setError({ ...error, senior: true });
                }
              }}
              error={error.senior}
              helperText={error.senior ? "Please enter a number" : ""}
            />
          </Grid>
        </Grid>
      </Form>
    </Grid>
  );
};

// Export
export default PaygradeForm;
