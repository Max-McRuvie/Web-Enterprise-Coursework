import React, {useState} from "react";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setAuthBool, unsetAuthBool } from '../state/user/userReducer';
import { Grid, TextField, Button, Typography } from '@mui/material';
import { Form } from 'react-router-dom';
import Text from '@mui/material/Typography';



export default function Login() {
    const [values, setValues] = useState({
        password: '',
        email: '',
        authorised: false,
        token: ''
      })
    
    const dispatch = useDispatch();

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value })
    }
    
    const handleSubmit = (e) => {
            e.preventDefault();
            console.log("Logging In")
            let data = {"email": values.email, "password" : values.password}
            var requestURI = "http://localhost:3000/auth.signin"
            console.log(requestURI)
            axios.post(requestURI, data)
            .then(response => {
            console.log("Setting JWT in storage")
            sessionStorage.setItem('auth', JSON.stringify(response.data));
            setValues({ ...values, 'authorised': true })
            setValues({ ...values, 'token': JSON.stringify(response.data) })
            dispatch(setAuthBool())
            })
            .catch(err => {
            console.log(err)
            });
    }

    return (
      <Grid container spacing={2} justifyContent={"center"} marginTop={"2%"}>
            <Grid container item xs={3} direction="column">
                <Text variant="h4" sx={{marginBottom: "2%"}}>Login</Text>
                <Form onSubmit={handleSubmit}>
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