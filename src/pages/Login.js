// Imports
import React, { useState } from "react";
import { Grid, TextField, Button, Typography } from "@mui/material";
import { Form } from "react-router-dom";
import auth from "../features/auth/auth-helper.js";
import { signin } from "../features/auth/auth-api.js";
import { useNavigate } from "react-router-dom";
import { validateEmail, validatePassword } from "../features/validation.js";

export default function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    password: "",
    email: "",
    authorised: false,
  });

  // Handle change in input fields
  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // Email & Password Validation
    const emailError = validateEmail(values.email, true);
    const passwordError = validatePassword(values.password, true);

    // Check for errors
    if (emailError || passwordError) {
      alert(emailError || passwordError);
      return;
    }

    // Create user data object for API call
    let userData = {
      email: values.email,
      password: values.password,
    };

    // Call login API and navigate to home on success
    try {
      signin(userData)
        .then((response) => {
          if(!response){
            throw new Error("Login Failed");
          }
          auth.authenticate(response);
        })
        .then(() => {
          navigate("/");
          window.location.reload();
        })
        .catch((error) => {
          alert(error);
        });
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <Grid container spacing={2} justifyContent={"center"} marginTop={"2%"}>
      <Grid container item xs={3} direction="column">
        <Typography variant="h4" sx={{ marginBottom: "2%" }}>
          Login
        </Typography>
        <Form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            variant="outlined"
            sx={{ marginBottom: "2%" }}
            fullWidth
            onChange={handleChange("email")}
          />
          <TextField
            label="Password"
            variant="outlined"
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
