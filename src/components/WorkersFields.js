import React from "react";
import { Box, TextField, MenuItem, Button } from "@mui/material";
import Text from "@mui/material/Typography";

const WorkersFields = ({workers, handleFieldChange, handleRemoveField}) => {
    return (
        <>
        {workers && workers.map((worker, index) => {
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
                onChange={(e) => handleFieldChange(e, index, "hourlyRate", "workers")}
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
                onChange={(e) => handleFieldChange(e, index, "hoursRequired", "workers")}
                />
                <Button
                    sx={{ margin: "2%" }}
                    variant={"contained"}
                    onClick={() =>
                        handleRemoveField(index, "workers")
                    }
                >
                    Remove Worker
                </Button>
            </Box>
            
            );
        })}
        </>
    )
}


export default WorkersFields;