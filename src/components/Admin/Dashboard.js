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

import PaygradeForm from './PaygradeForm';
import FudgeFactorForm from './FudgeFactorForm';


import {adjustPayGrades, adjustFudgeFactor} from '../../features/admin/admin-api';

const Dashboard = () => {
    const [paygrade, setPaygrade] = useState({
        junior: 0,
        standard: 0,
        senior: 0,
    });
    const [fudgeFactor, setFudgeFactor] = useState(0);

    const handleChange = (event, fieldName, fieldType) => {
        if(fieldType === "PaygradeSettings") {
            setPaygrade({
                ...paygrade,
                [fieldName]: event.target.value,
            });
        } else if(fieldType === "FudgeFactorSettings") {
            console.log(event.target.value)
            setFudgeFactor(event.target.value);
        }
      };

    const handleSubmit = (e, actionType) => {
        e.preventDefault();
        if(actionType === "Paygrade") {
            adjustPayGrades(paygrade);
        }
        if(actionType=== "FudgeFactor") {
            adjustFudgeFactor(fudgeFactor);
        }
    }

    return (
        <Container maxWidth="lg" marginBottom={5}>
                    <Grid container item xs={12} direction="row" justifyContent="center" spacing={2}>
                        <Grid item>
                            <PaygradeForm handleSubmit={handleSubmit} handleChange={handleChange} paygrade={paygrade}/>
                        </Grid>
                        <Grid item>
                            <FudgeFactorForm handleSubmit={handleSubmit} handleChange={handleChange} fudgeFactor={fudgeFactor}/>
                        </Grid>

                        <Grid container item xs={12} direction="row" justifyContent="center" spacing={2}>
                            <Grid item>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    onClick={(e) => handleSubmit(e, 'Paygrade')}
                                >
                                    Submit Paygrade
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    onClick={(e) => handleSubmit(e, 'FudgeFactor')}
                                >
                                    Submit Fudge Factor
                                </Button>
                            </Grid>
                    </Grid>
                </Grid>
                </Container>
    )
}

export default Dashboard;
