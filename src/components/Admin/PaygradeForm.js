import React, {useState} from 'react';
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

const PaygradeForm = ({handleSubmit, handleChange, paygrade}) => {

    const [junior, setJunior] = useState(paygrade.junior);
    const [standard, setStandard] = useState(paygrade.standard);
    const [senior, setSenior] = useState(paygrade.senior);

    const [error, setError] = useState({
        junior: false,
        standard: false,
        senior: false,
    });


  return (
    <Grid item xs={6}>
      <Text marginBottom={"2%"}>
        <Typography variant="h4">Paygrade</Typography>
      </Text>
      <Form noValidate autoComplete="off">
        <Grid container direction="column" spacing={2}>
            <Grid item>
                <TextField 
                id="standard-basic" 
                label="Standard" 
                title="Junior Paygrade"
                value={junior}
                type='number'
                onChange={(e) => { 
                    let parsedValue = parseFloat(e.target.value)
                    if(!isNaN(parsedValue)){
                        setError({...error, junior: false});
                        setJunior(e.target.value)
                        handleChange(e, "junior", "PaygradeSettings")
                    } else {
                        setError({...error, junior: true});
                    }}}
                error={error.junior}
                helperText={error.junior ? "Please enter a number" : ""}
            />
            </Grid>
            <Grid item>
            <TextField 
            id="standard-basic" 
            label="Standard" 
            title="Standard Paygrade"
            value={standard}
            type='number'
            onChange={(e) => { 
                let parsedValue = parseFloat(e.target.value)
                if(!isNaN(parsedValue)){
                    setError({...error, standard: false});
                    setStandard(e.target.value)
                    handleChange(e, "standard", "PaygradeSettings")
                } else {
                    setError({...error, standard: true});
                }}}
            error={error.standard}
            helperText={error.standard ? "Please enter a number" : ""}
            />
          </Grid>
          <Grid item>
            <TextField 
            id="standard-basic" 
            label="Standard" 
            title="Senior Paygrade"
            value={senior}
            type='number'
            onChange={(e) => { 
                let parsedValue = parseFloat(e.target.value)
                if(!isNaN(parsedValue)){
                    setError({...error, senior: false});
                    setSenior(e.target.value)
                    handleChange(e, "senior", "PaygradeSettings")
                } else {
                    setError({...error, senior: true});
                }}}
            error={error.senior}
            helperText={error.senior ? "Please enter a number" : ""}
            />
          </Grid>
        </Grid>
      </Form>
    </Grid>
  );
};

export default PaygradeForm;