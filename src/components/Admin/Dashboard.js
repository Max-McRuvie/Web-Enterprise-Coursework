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

    const handleSubmit = (e) => {
        // e.preventDefault();
        // console.log(e.target);
    }

    return (
        <Container maxWidth="lg" marginBottom={5}>
                    <Grid container item xs={12} spacing={2} marginTop="2%" direction="row" justifyContent="center">
                        <FudgeFactorForm handleSubmit={handleSubmit} handleChange={handleChange} fudgeFactor={fudgeFactor}/>
                        <PaygradeForm handleSubmit={handleSubmit} handleChange={handleChange} paygrade={paygrade}/>

                        <Grid item xs={12}>
                            <Button>
                                Submit Paygrade
                            </Button>

                            <Button>
                                Submit Fudge Factor
                            </Button>

                    </Grid>
                </Grid>
                </Container>
    )
}

export default Dashboard;
