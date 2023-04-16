// Description: This component is used to create a new quote or edit an existing quote. It is used in the CreateQuote and EditQuote components.

// React Imports
import React, { useState, useEffect } from "react";

// Material UI imports
import { Grid, TextField, Button, Box, Typography, styled } from "@mui/material";

// React Router Imports
import { useNavigate } from "react-router-dom";

// React Router Imports
import { Form, useParams } from "react-router-dom";

import DOMPurify, { sanitize } from "dompurify";

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
  // Navigate
  const navigate = useNavigate();
  
  const { quoteId } = useParams();
  const [errors, setErrors] = useState({});
  const [isAdmin] = useState(auth.isAdmin());

  const [projectInfo, setProjectInfo] = useState({
    title: "",
    manHours: "",
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
    // Sanitize value to prevent XSS attacks
    let sanitisedValue = DOMPurify.sanitize(e.target.value);

    if(sanitisedValue !== e.target.value) {
      alert("Invalid input. Please try again.");
      return;
    }

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

    const errorFound = false;

    // Validate title
    const titleError = validateTitle(projectInfo.title);
    if (titleError) {
      alert(titleError);
      return;
    }

    projectInfo.workers.forEach((worker) => {
      if (worker.name === "" || worker.hourlyRate === "" || worker.hoursRequired === "") {
        alert("Please fill out all fields for workers.");
        errorFound = true;
        return;
      }
    });

    projectInfo.physicalResources.forEach((resource) => {
      if (resource.title === "" || resource.cost === "") {
        alert("Please fill out all fields for physical resources.");
        errorFound = true;
        return;
      }
    });

    if(errorFound) {
      return;
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
    alert("Quote saved successfully!");
    navigate("/quote-list");
  };

  // Handle Delete
  const handleUpdate = async (e) => {
    e.preventDefault();
    await updateQuote(quoteId, projectInfo);
    alert("Quote updated successfully!");
    navigate("/quote-list");
  };

  // If quote is passed in, set project info to quote to populate form
  // used for edit mode
  useEffect(() => {
    if (quote) {
      console.log(quote)
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
          <TextField
            label="Total Man Hours Required"
            variant="outlined"
            sx={{ marginBottom: "2%" }}
            value={projectInfo.manHours}
            fullWidth
            type="number"
            onChange={(e) =>
              setProjectInfo({ ...projectInfo, manHours: e.target.value })
            }
            onKeyPress={(e) => {
              // Prevent non-numeric characters from being entered
              const isNumeric = /^[0-9]*$/;
              if (!isNumeric.test(e.key)) {
                e.preventDefault();
              }
            }}

          />
          <Grid container spacing={2} sx={{ display: "flex" }}>
            <Grid item sx={{ flex: 1 }}>
              <WorkersFields
                workers={projectInfo.workers}
                handleFieldChange={handleFieldChange}
                handleRemoveField={handleRemoveField}
                errors={errors}
                manHours={projectInfo.manHours}
              />
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
            </Grid>
            <Grid item sx={{ flex: 1 }}>
              <PhysicalResourcesFields
                physicalResources={projectInfo.physicalResources}
                handleFieldChange={handleFieldChange}
                handleRemoveField={handleRemoveField}
                errors={errors}
              />
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
            </Grid>
          </Grid>

          <Box sx={{ textAlign: "center", marginBottom:"5%", marginTop:"5%"}}>
            <StyledButton onClick={handleSubmit}>Calculate Quote</StyledButton>

            {isAdmin ? (
              <StyledButton sx={{marginLeft: "5%"}} onClick={handleAdminSubmit}>
                Admin Calculate Quote
              </StyledButton>
            ) : (
              <></>
            )}
          </Box>
        </Form>

        <Typography variant="h5">Total Cost: ${projectInfo.total_cost || 0}</Typography>

        {projectInfo.total_cost > 0 && (
          <Box sx={{ marginTop: "2%", marginBottom:"5%" }}>
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
