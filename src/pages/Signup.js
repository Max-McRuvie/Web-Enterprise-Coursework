// imports
import React, { useState } from "react";
import { Grid, Button, TextField, Typography } from "@mui/material";
import { Form } from "react-router-dom";
import { signup } from "../features/user/user-api.js";
import { validateName, validateEmail, validatePassword } from "../features/validation.js";
import { useNavigate } from "react-router-dom";

// Signup page component
export default function Signup() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    password: "",
    email: "",
    error: "",
  });

  // Handle change in input fields
  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  // Handle submit
  const handleSubmit = (e) => {
    const nameError = validateName(values.name);
    const emailError = validateEmail(values.email);
    const passwordError = validatePassword(values.password);

    // Check for errors
    if (nameError || emailError || passwordError) {
      alert(nameError || emailError || passwordError );
      return;
    }

    // Call signup API and navigate to login on success
    try {
      signup(values).then(() => {
        alert("Signup Successful");
        navigate("/login");
        window.location.reload();
      }).catch((error) => {
        alert(error);
      });
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Grid container spacing={2} justifyContent={"center"} marginTop={"2%"}>
      <Grid container item xs={3} direction="column">
        <Typography variant="h4" sx={{ marginBottom: "2%" }}>
          Signup
        </Typography>
        <Form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            variant="outlined"
            sx={{ marginBottom: "2%" }}
            fullWidth
            onChange={handleChange("name")}
          />
          <TextField
            label="Email"
            variant="outlined"
            required
            sx={{ marginBottom: "2%" }}
            fullWidth
            onChange={handleChange("email")}
          />
          <TextField
            label="Password"
            variant="outlined"
            required
            sx={{ marginBottom: "2%" }}
            type="password"
            fullWidth
            onChange={handleChange("password")}
          />
          <Button variant="contained" sx={{ marginBottom: "2%" }} type="submit">
            Submit
          </Button>
        </Form>
      </Grid>
    </Grid>
  );
}
