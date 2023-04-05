import React from 'react';
import { Box, TextField, Button } from "@mui/material";
import Text from "@mui/material/Typography";

const PhysicalResourcesFields = ({physicalResources, handleFieldChange, handleRemoveField}) => {
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

export default PhysicalResourcesFields;