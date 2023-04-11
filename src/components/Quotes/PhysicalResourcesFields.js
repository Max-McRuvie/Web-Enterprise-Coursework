// Description: This component is used to create a new quote or edit an existing quote. It is used in the CreateQuote and EditQuote components.

// Imports
import React from 'react';
import { Box, TextField, Button, Typography} from "@mui/material";

// Component
const PhysicalResourcesFields = ({physicalResources, handleFieldChange, handleRemoveField}) => {
    return (
        <>
         {physicalResources && physicalResources.map((resource, index) => {
                        return (
                        <Box key={index}>
                            <Typography>Resource: {index + 1}</Typography>
                            <TextField
                            label="Title"
                            variant="filled"
                            sx={{ marginBottom: "2%" }}
                            type="text"
                            fullWidth
                            value={resource.title}
                            onChange={(e) => handleFieldChange(e, index, "title", "physicalResources")}
                            />
                           
                            <TextField
                            label={`Cost`}
                            variant="filled"
                            sx={{ marginBottom: "2%" }}
                            fullWidth
                            type="number"
                            value={resource.cost}
                            onChange={(e) => handleFieldChange(e, index, "cost", "physicalResources")}
                  
                            />
                            <Button
                                sx={{ margin: "2%" }}
                                variant={"contained"}
                                onClick={() =>
                                    handleRemoveField(index, "physicalResources")
                                }
                            >
                                Remove Resource
                            </Button>
                        </Box>
                        );
                    })}
        </>
    )
}

// Export
export default PhysicalResourcesFields;