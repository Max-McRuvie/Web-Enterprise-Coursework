import React, {useState} from "react";
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Text from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Form } from 'react-router-dom';
import { signup } from "../features/user/user-api";
import authenticate from "../features/auth/auth-helper";
import { validateEmail, validatePassword } from "../features/validation";
import { useNavigate } from "react-router-dom";

export default function Signup() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        name: '',
        password: '',
        email: '',
        error: ''
      })
    
    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value })
    }
    
    const handleSubmit = (e) => {
        const emailError = validateEmail(values.email);
        const passwordError = validatePassword(values.password);

        if(emailError || passwordError){
            alert(emailError || passwordError)
            return;
        }

        signup(values).then (() => {
            alert("Signup Successful")
            navigate("/login");
            window.location.reload();
        })
    }

    return (
      <Grid container spacing={2} justifyContent={"center"} marginTop={"2%"}>
            <Grid container item xs={3} direction="column">
                <Text variant="h4" sx={{marginBottom: "2%"}}>Signup</Text>
                <Form onSubmit={handleSubmit}>
                    <TextField 
                                label="Name"
                                variant="outlined"
                                sx={{marginBottom: "2%"}}
                                fullWidth
                                onChange={handleChange('email')}
                            />
                        <TextField 
                            label="Email"
                            variant="outlined"
                            required
                            sx={{marginBottom: "2%"}}
                            fullWidth
                            onChange={handleChange('email')}
                        />
                        <TextField 
                            label="Password"
                            variant="outlined"
                            required
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
