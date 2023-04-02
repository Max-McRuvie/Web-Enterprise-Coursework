import React from 'react';
import { Box, TextField } from "@mui/material";
import Text from "@mui/material/Typography";

const PhysicalResourcesFields = ({physicalResources, handlePhysicalResourceChange}) => {
    return (
        <>
         {physicalResources && physicalResources.map((resource, index) => {
                        return (
                        <Box key={index}>
                            <Text>Resource: {index + 1}</Text>
                            <TextField
                            label="Title"
                            variant="filled"
                            sx={{ marginBottom: "2%" }}
                            type="text"
                            fullWidth
                            value={resource.title}
                            onChange={(e) => handlePhysicalResourceChange(e, index, "title")}
                            />
                           
                            <TextField
                            label={`Cost`}
                            variant="filled"
                            sx={{ marginBottom: "2%" }}
                            fullWidth
                            type="number"
                            value={resource.cost}
                            onChange={(e) => handlePhysicalResourceChange(e, index, "cost")}
                            />
                        </Box>
                        );
                    })}
        </>
    )
}

export default PhysicalResourcesFields;