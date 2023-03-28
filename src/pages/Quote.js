import React from 'react'
import theme from '../theme';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Text from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Form } from 'react-router-dom';
import { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { saveQuote } from '../features/quote/quote-api';

const { main, light, darkNavbar, contrastText } = theme.palette.primary;



const StyledButton = styled(Button)(({ theme, color = 'primary' }) => ({
    backgroundColor: darkNavbar,
    ':hover': {
      backgroundColor: light,
        color: darkNavbar,
    },
}));

const Quote = () => {
    const [projectInfo, setprojectInfo] = useState({
        title: "",
        description: "",
        workers: [{hourlyRate: 0, hoursRequired: 0}],
    })

    const handleWorkerChange = (e, index, field) => {
        const workers = [...projectInfo.workers];
        workers[index][field] = e.target.value;
        setprojectInfo({ ...projectInfo, workers });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitting quote")
        saveQuote(projectInfo)

        // let cost_per_person = projectInfo.workers.reduce((acc, worker) => {
        //     return acc + (worker.hourlyRate * worker.hoursRequired)
        // }, 0)

        // let total_cost = cost_per_person * projectInfo.workers.length

        // setQuote({
        //     cost_per_person: cost_per_person,
        //     total_cost: total_cost,
        // })
    }

    return (
        <Grid container spacing={2} justifyContent={"center"} marginTop={"2%"}>
            <Grid container item xs={5} direction="column">
                <Text variant="h4" sx={{marginBottom: "2%"}}>Get a Quote</Text>
                <Form onSubmit={handleSubmit}>
                    <TextField
                        label="Project Title"
                        variant="outlined"
                        sx={{ marginBottom: "2%" }}
                        fullWidth
                        onChange={(e) =>
                        setprojectInfo({ ...projectInfo, title: e.target.value })
                        }
                    />
                    {projectInfo.workers.map((worker, index) => {
                        return (
                        <Box key={index}>
                            <Text>Worker {index + 1}</Text>
                            <TextField
                            label="Hourly Rate"
                            variant="filled"
                            sx={{ marginBottom: "2%" }}
                            type="number"
                            fullWidth
                            select
                            value={worker.hourlyRate}
                            onChange={(e) => handleWorkerChange(e, index, "hourlyRate")}
                            >
                            <MenuItem value="10">Junior</MenuItem>
                            <MenuItem value="15">Standard</MenuItem>
                            <MenuItem value="20">Senior</MenuItem>
                            </TextField>
                            <TextField
                            label={`Hours Required`}
                            variant="filled"
                            sx={{ marginBottom: "2%" }}
                            fullWidth
                            value={worker.hoursRequired}
                            onChange={(e) => handleWorkerChange(e, index, "hoursRequired")}
                            />
                        </Box>
                        );
                    })}
                    <Box sx={{ textAlign: "center" }}>
                        <StyledButton
                        sx={{ margin: "2%" }}
                        variant={"contained"}
                        onClick={() =>
                            setprojectInfo({
                            ...projectInfo,
                            workers: [
                                ...projectInfo.workers,
                                { hourlyRate: 0, hoursRequired: 0 },
                            ],
                            })
                        }
                        >
                        Add Worker
                        </StyledButton>
                        <StyledButton
                        sx={{ margin: "2%" }}
                        variant={"contained"}
                        onClick={() =>
                            setprojectInfo({
                            ...projectInfo,
                            workers: projectInfo.workers.slice(0, -1),
                            })
                        }
                        >
                        Remove Worker
                        </StyledButton>
                    </Box>
                    <StyledButton type="submit" variant={"contained"}>
                        Submit
                    </StyledButton>
                    </Form>

                    { quote.total_cost > 0 && (
                        <Box sx={{ marginTop: "2%" }}>
                            <Text variant="h5">Total Cost: ${quote.total_cost}</Text>
                        </Box>
                    )}
            </Grid>
        </Grid>
    )
}

export default Quote