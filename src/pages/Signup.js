import React, {useState} from "react";
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Text from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Form } from 'react-router-dom';


export default function Signup() {
    const [values, setValues] = useState({
        name: '',
        password: '',
        email: '',
        open: false,
        error: ''
      })
    
    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value })
    }
    
    const handleSubmit = (e) => {
            e.preventDefault();
            console.log("Signing up")
            let data = {"name": values.name, "email": values.email, "password" : values.password}
            var requestURI = "http://localhost:3000/api/users"
            console.log(requestURI)
            axios.post(requestURI, data)

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
