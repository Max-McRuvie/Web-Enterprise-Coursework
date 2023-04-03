import React, {useState} from "react";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setAuthBool, unsetAuthBool } from '../state/auth/authReducer';
import { Grid, TextField, Button, Typography } from '@mui/material';
import { Form } from 'react-router-dom';
import Text from '@mui/material/Typography';
import auth from '../features/auth/auth-helper'
import { signin } from '../features/auth/auth-api.js'
import { useNavigate } from "react-router-dom";

import { validateEmail, validatePassword } from "../features/validation";

export default function Login() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        password: '',
        email: '',
        authorised: false,
      })

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value })
    }
    
    const handleSubmit = (e) => {
            e.preventDefault();
            console.log("Logging In")

            const emailError = validateEmail(values.email);
            const passwordError = validatePassword(values.password);

            if(emailError || passwordError){
                alert(emailError || passwordError)
                return;
            }

            let userData = {
                "email": values.email, 
                "password" : values.password
            }

            signin(userData).then((response) => {
                auth.authenticate(response, () => {
                    setValues({ ...values, 'authorised': true })
            })
            }).then (() => {
                navigate("/");
                window.location.reload();
            })
    }

    return (
      <Grid container spacing={2} justifyContent={"center"} marginTop={"2%"}>
            <Grid container item xs={3} direction="column">
                <Text variant="h4" sx={{marginBottom: "2%"}}>Login</Text>
                <Form onSubmit={handleSubmit}>
                        <TextField 
                            label="Email"
                            variant="outlined"
                            sx={{marginBottom: "2%"}}
                            fullWidth
                            onChange={handleChange('email')}
                        />
                        <TextField 
                            label="Password"
                            variant="outlined"
                            sx={{marginBottom: "2%"}}
                            type="password"
                            fullWidth
                            onChange={handleChange('password')}
                        />
                        <Button variant="contained" sx={{marginBottom: "2%"}} type="submit">Submit</Button>
                    </Form>
            </Grid>
        </Grid>
    );
}