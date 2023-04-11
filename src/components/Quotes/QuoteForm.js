// Description: This component is used to create a new quote or edit an existing quote. It is used in the CreateQuote and EditQuote components.

// React Imports
import React, { useState, useEffect } from "react";

// Material UI imports
import { Grid, TextField, Button, Box, Typography, styled } from "@mui/material";

// React Router Imports
import { Form, useParams } from "react-router-dom";

// Feature Imports
import {
  calculateQuote,
  saveQuote,
  updateQuote,
} from "../../features/quote/quote-api.js";
import { validateTitle } from "../../features/validation.js";
import auth from "../../features/auth/auth-helper.js";
import { calculationWithoutFudgeFactor } from "../../features/admin/admin-api.js";

// Component Imports
import WorkersFields from "./WorkersFields.js";
import PhysicalResourcesFields from "./PhysicalResourcesFields.js";

import theme from "../../theme.js";
// Theme & Styled Components
const { light, darkNavbar } = theme.palette.primary;

const StyledButton = styled(Button)(({ theme, color = "primary" }) => ({
  backgroundColor: darkNavbar,
  ":hover": {
    backgroundColor: light,
    color: darkNavbar,
  },
}));

// Component
const QuoteForm = ({ quote, edit }) => {
  const { quoteId } = useParams();
  const [errors, setErrors] = useState({});
  const [isAdmin] = useState(auth.isAdmin());

  const [projectInfo, setProjectInfo] = useState({
    title: "",
    workers: [
      {
        name: "",
        hourlyRate: "",
        hoursRequired: "",
      },
    ],
    physicalResources: [
      {
        title: "",
        cost: "",
      },
    ],
    total_cost: "",
  });

  // Handle Change
  const handleFieldChange = (e, index, field, type) => {
    // Check field type prior to setting state to avoid errors
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

  // Handle Remove Field
  const handleRemoveField = (index, type) => {
    // Check field type prior to setting state to avoid errors
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

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate title
    const titleError = validateTitle(projectInfo.title);
    if (titleError) {
      alert(titleError);
    }

    // Calculate quote
    let budget = await calculateQuote(projectInfo);

    // Set total cost
    setProjectInfo((prevState) => ({
      ...prevState,
      total_cost: budget.totalCost,
    }));
  };

  // Handle Admin Submit
  const handleAdminSubmit = async (e) => {
    e.preventDefault();

    // Validate title
    const titleError = validateTitle(projectInfo.title);
    if (titleError) {
      alert(titleError);
    }

    // Calculate quote
    let budget = await calculationWithoutFudgeFactor(projectInfo);

    // Set total cost
    setProjectInfo((prevState) => ({
      ...prevState,
      total_cost: budget.totalCost,
    }));
  };

  // Handle Save
  const handleSave = async (e) => {
    e.preventDefault();
    await saveQuote(projectInfo);
  };

  // Handle Delete
  const handleUpdate = async (e) => {
    e.preventDefault();
    await updateQuote(quoteId, projectInfo);
  };

  // If quote is passed in, set project info to quote to populate form
  // used for edit mode
  useEffect(() => {
    if (quote) {
      setProjectInfo(quote);
    }
  }, [quote]);

  // Render
  return (
    <Grid container spacing={2} justifyContent={"center"} marginTop={"2%"}>
      <Grid container item xs={5} direction="column">
        <Typography variant="h4" sx={{ marginBottom: "2%" }}>
          {edit ? "Edit Quote" : "Create Quote"}
        </Typography>
        <Form>
          <TextField
            label="Project Title"
            variant="outlined"
            sx={{ marginBottom: "2%" }}
            value={projectInfo.title}
            fullWidth
            onChange={(e) =>
              setProjectInfo({ ...projectInfo, title: e.target.value })
            }
            error={Boolean(errors.title)}
            helperText={errors.title}
          />
          <Grid container spacing={2} sx={{ display: "flex" }}>
            <Grid item sx={{ flex: 1 }}>
              <WorkersFields
                workers={projectInfo.workers}
                handleFieldChange={handleFieldChange}
                handleRemoveField={handleRemoveField}
                errors={errors}
              />
            </Grid>
            <Grid item sx={{ flex: 1 }}>
              <PhysicalResourcesFields
                physicalResources={projectInfo.physicalResources}
                handleFieldChange={handleFieldChange}
                handleRemoveField={handleRemoveField}
                errors={errors}
              />
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
          <StyledButton onClick={handleSubmit}>Calculate Quote</StyledButton>

          {isAdmin ? (
            <StyledButton onClick={handleAdminSubmit}>
              Admin Calculate Quote
            </StyledButton>
          ) : (
            <></>
          )}
        </Form>

        <Typography variant="h5">Total Cost: ${projectInfo.total_cost || 0}</Typography>

        {projectInfo.total_cost > 0 && (
          <Box sx={{ marginTop: "2%" }}>
            {edit ? (
              <Button
                variant="contained"
                sx={{ marginTop: "2%" }}
                onClick={handleUpdate}
              >
                Update Quote
              </Button>
            ) : (
              <Button
                variant="contained"
                sx={{ marginTop: "2%" }}
                onClick={handleSave}
              >
                Save Quote
              </Button>
            )}
          </Box>
        )}
      </Grid>
    </Grid>
  );
};

// Export
export default QuoteForm;
