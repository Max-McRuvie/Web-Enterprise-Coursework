import React from "react";
import { Box, TextField, MenuItem } from "@mui/material";
import Text from "@mui/material/Typography";

const WorkersFields = ({workers, handleWorkerChange}) => {
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
                onChange={(e) => handleWorkerChange(e, index, "name")}
                />
                
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
        </>
    )
}


export default WorkersFields;