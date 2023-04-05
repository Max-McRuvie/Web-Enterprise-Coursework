import React, { useState } from 'react';
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

const FudgeFactorForm = ({handleSubmit, handleChange,  fudgeFactor}) => {
  const [value, setValue] = useState(fudgeFactor)
  const [error, setError] = useState(false);

  return (
    <Grid item xs={12}>
      <Text marginBottom={"2%"}>
        <Typography variant="h4">Fudge Factor</Typography>
      </Text>
      <Form noValidate autoComplete="off">
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <TextField 
            id="standard-basic" 
            label="Fudge Factor" 
            value={value}
            title="Fudge Factor"
            type='number'
            step="any"
            onChange={(e) => { 
                let parsedValue = parseFloat(e.target.value)
                if(!isNaN(parsedValue)){
                    setError(false)
                    setValue(e.target.value)
                    handleChange(e, "fudgeFactor", "FudgeFactorSettings")
                } else {
                    setError(true)
                }}}
            error={error}
            helperText={error ? "Please enter a number" : ""}
            />
          </Grid>
        </Grid>
      </Form>
    </Grid>
  );
};

export default FudgeFactorForm;