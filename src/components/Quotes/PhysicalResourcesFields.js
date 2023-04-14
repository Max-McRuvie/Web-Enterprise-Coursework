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
                            inputProps={{ min: 0 }} // Set minimum value to 0
                            onChange={(e) => handleFieldChange(e, index, "cost", "physicalResources")}
                            onKeyPress={(e) => {
                                // Prevent non-numeric characters from being entered
                                const isNumeric = /^[0-9]*$/;
                                if (!isNumeric.test(e.key)) {
                                  e.preventDefault();
                                }
                              }}
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