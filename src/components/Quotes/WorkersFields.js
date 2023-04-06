// Decription: This component is used to render the fields for the workers in the quote form

// Imports
import React from "react";
import { Box, TextField, MenuItem, Button } from "@mui/material";
import Text from "@mui/material/Typography";

// Component
const WorkersFields = ({ workers, handleFieldChange, handleRemoveField }) => {
  return (
    <>
      {workers &&
        workers.map((worker, index) => {
          return (
            <Box key={index}>
              <Text>Worker: {index + 1}</Text>
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
                onChange={(e) =>
                  handleFieldChange(e, index, "hoursRequired", "workers")
                }
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
