// Decription: This component is used to render the fields for the workers in the quote form

// Imports
import React from "react";
import { Box, TextField, MenuItem, Button, Typography} from "@mui/material";

// Component
const WorkersFields = ({ workers, handleFieldChange, handleRemoveField, manHours }) => {
  return (
    <>
      {workers &&
        workers.map((worker, index) => {
          return (
            <Box key={index}>
              <Typography>Worker: {index + 1}</Typography>
              <TextField
                label="Name"
                variant="filled"
                sx={{ marginBottom: "2%" }}
                type="text"
                fullWidth
                value={worker.name}
                onChange={(e) => handleFieldChange(e, index, "name", "workers")}
              />

              <TextField
                label="Hourly Rate"
                variant="filled"
                sx={{ marginBottom: "2%" }}
                type="number"
                fullWidth
                select
                value={worker.hourlyRate}
                onChange={(e) =>
                  handleFieldChange(e, index, "hourlyRate", "workers")
                }
              >
                <MenuItem value="Junior">Junior</MenuItem>
                <MenuItem value="Standard">Standard</MenuItem>
                <MenuItem value="Senior">Senior</MenuItem>
              </TextField>
              <TextField
                label={`Hours Required`}
                variant="filled"
                sx={{ marginBottom: "2%" }}
                fullWidth
                type="number"
                value={worker.hoursRequired}
                inputProps={{ min: 0 }} // Set minimum value to 0
                onChange={(e) => 
                  handleFieldChange(e, index, "hoursRequired", "workers")
                }
                onKeyPress={(e) => {
                  // Prevent non-numeric characters from being entered
                  const isNumeric = /^[0-9]*$/;
                  if (!isNumeric.test(e.key)) {
                    e.preventDefault();
                  } else {
                    const newValue = parseInt((e.target.value || '') + e.key, 10);
                    if (newValue > manHours) {
                      e.preventDefault();
                      alert("The hours required cannot be above the total")
                    }
                  }
                }}
              />
              <Button
                sx={{ margin: "2%" }}
                variant={"contained"}
                onClick={() => handleRemoveField(index, "workers")}
              >
                Remove Worker
              </Button>
            </Box>
          );
        })}
    </>
  );
};

// Export
export default WorkersFields;
