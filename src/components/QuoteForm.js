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
import PhysicalResourcesFields from './PhysicalResourcesFields';

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
            name: '',
            hourlyRate: '',
            hoursRequired: '',
          },
        ],
        physicalResources: [
            {
                title: '',
                cost: 0,
            },
        ],
        total_cost: '',
      });

    const handleFieldChange = (e, index, field, type) => {
        if (type === "workers") {
            const workers = [...projectInfo.workers];
            workers[index][field] = e.target.value;
            setProjectInfo({ ...projectInfo, workers });
        } else if (type === "physicalResources") {
            const physicalResources = [...projectInfo.physicalResources];
            physicalResources[index][field] = e.target.value;
            setProjectInfo({ ...projectInfo, physicalResources });
        }
    };

    const handleRemoveField = (index, type) => {
        if (type === "workers") {
          const workers = [...projectInfo.workers];
          workers.splice(index, 1);
          setProjectInfo({ ...projectInfo, workers });
        } else if (type === "physicalResources") {
          const physicalResources = [...projectInfo.physicalResources];
          physicalResources.splice(index, 1);
          setProjectInfo({ ...projectInfo, physicalResources });
        }
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
                    <Grid container spacing={2} sx={{ display: 'flex' }}>
                        <Grid item sx={{ flex: 1 }}>
                            <WorkersFields workers={projectInfo.workers} handleFieldChange={handleFieldChange} handleRemoveField={handleRemoveField} />
                        </Grid>
                        <Grid item sx={{ flex: 1 }}>
                            <PhysicalResourcesFields physicalResources={projectInfo.physicalResources} handleFieldChange={handleFieldChange} handleRemoveField={handleRemoveField}/>
                        </Grid>
                    </Grid>

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
                            physicalResources: [
                                ...projectInfo.physicalResources,
                                { cost: 0 },
                            ],
                            })
                        }
                        >
                        Add Physical Resource
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