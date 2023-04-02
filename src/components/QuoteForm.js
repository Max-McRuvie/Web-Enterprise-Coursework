import React, { useState, useEffect } from 'react';
import {
    Grid,
    TextField,
    Button,
    MenuItem,
    Box
} from '@mui/material';
import Text from '@mui/material/Typography';
import { Form } from 'react-router-dom';
import theme from '../theme';
import { styled } from '@mui/material/styles';
import { calculateQuote, saveQuote, updateQuote } from '../features/quote/quote-api';
import { useParams } from 'react-router-dom';

import WorkersFields from './WorkersFields';

const { main, light, darkNavbar, contrastText } = theme.palette.primary;

const StyledButton = styled(Button)(({ theme, color = 'primary' }) => ({
    backgroundColor: darkNavbar,
    ':hover': {
      backgroundColor: light,
        color: darkNavbar,
    },
}));

const QuoteForm = ({ quote, edit }) => {
    const { quoteId } = useParams();

    const [projectInfo, setProjectInfo] = useState({
        title: '',
        workers: [
          {
            hourlyRate: '',
            hoursRequired: '',
          },
        ],
        total_cost: '',
      });

      const handleWorkerChange = (e, index, field) => {
        const workers = [...projectInfo.workers];
        workers[index][field] = e.target.value;
        setProjectInfo({ ...projectInfo, workers });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitting quote")
        let budget = await calculateQuote(projectInfo)
        
        setProjectInfo((prevState) => ({
            ...prevState,
            total_cost: budget.totalCost,
          }));
    }

    const handleSave = async (e) => {
        e.preventDefault();
        console.log("Saving quote")
        await saveQuote(projectInfo)
    }

    const handleUpdate = async (e) => {
        e.preventDefault();
        await updateQuote(quoteId, projectInfo)
    }
    
      useEffect(() => {
        if (quote) {
          setProjectInfo(quote);
          console.log(quote)
          console.log(projectInfo)
        }
      }, [quote]);

    return (
        <Grid container spacing={2} justifyContent={"center"} marginTop={"2%"}>
            <Grid container item xs={5} direction="column">
                <Text variant="h4" sx={{marginBottom: "2%"}}>{edit ? 'Edit Quote' : 'Create Quote'}</Text>
                <Form onSubmit={handleSubmit}>
                    <TextField
                        label="Project Title"
                        variant="outlined"
                        sx={{marginBottom: "2%"}}
                        value={projectInfo.title}
                        fullWidth
                        onChange={(e) => setProjectInfo({...projectInfo, title: e.target.value})}
                    />
                    <WorkersFields workers={projectInfo.workers} handleWorkerChange={handleWorkerChange} />
                    <Box sx={{ textAlign: "center" }}>
                        <StyledButton
                        sx={{ margin: "2%" }}
                        variant={"contained"}
                        onClick={() =>
                            setProjectInfo({
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
                            setProjectInfo({
                            ...projectInfo,
                            workers: projectInfo.workers.slice(0, -1),
                            })
                        }
                        >
                        Remove Worker
                        </StyledButton>
                    </Box>
                    <StyledButton type="submit" variant={"contained"}>
                        Calculate Quote
                    </StyledButton>
                    </Form>

                    { projectInfo.total_cost > 0 && (
                        <Box sx={{ marginTop: "2%" }}>
                            <Text variant="h5">Total Cost: ${projectInfo.total_cost}</Text>
                            { edit ? (
                                <Button variant="contained" sx={{ marginTop: "2%" }} onClick={handleUpdate}>Update Quote</Button>
                            ) : (
                                <Button variant="contained" sx={{ marginTop: "2%" }} onClick={handleSave}>Save Quote</Button>
                            )}
                        </Box>
                    )}
            </Grid>
        </Grid>
    );
}

export default QuoteForm