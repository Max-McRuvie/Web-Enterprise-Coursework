// Imports
import React from "react";
import { Typography } from "@mui/material";
import { Container, Grid } from "@mui/material";

const Home = () => {
  return (
    <Grid container spacing={2} justifyContent={"center"} marginTop={"2%"}>
      <Grid container item xs={5} direction="column">
        <Grid item>
          <Typography variant="h4" m={"5%"}>
            Welcome to the Quote Generator
          </Typography>
        </Grid>
        <Grid item>
          <Container
            maxWidth="sm"
            sx={{
              backgroundColor: "white",
              border: "1px solid",
              borderColor: "grey.500",
              borderRadius: "5px",
              padding: "1%",
              marginTop: "1%",
              marginBottom: "5%",
            }}
          >
            <Typography variant="h6">How are quotes genereted?</Typography>
            <Typography variant="body1">
              The quote generator uses a number of factors to generate a quote.
              These factors include primarly the number of hours required of
              each worker, their paygrade, and any physycal resources required
              along with the number of hours required for each resource. These
              values are all multiplied by the hourly rate of the worker and the
              hourly rate of the resource. The final quote is the sum of all of
              these values. This is how the final result is calculated. When a
              quote is generated it is not entirly accurate due to the Fudge
              Factor feature. This feature is explained in the next section.
            </Typography>
          </Container>
        </Grid>
        <Grid item>
          <Container
            maxWidth="sm"
            sx={{
              backgroundColor: "white",
              border: "1px solid",
              borderColor: "grey.500",
              borderRadius: "5px",
              padding: "1%",
              marginTop: "1%",
            }}
          >
            <Typography variant="h6">The Fudge Factor</Typography>
            <Typography variant="body1">
              This site has a feature called the Fudge Factor. The purpose of
              this feature is to prevent quotes from being reverse engineered.
              This works by adjusting certain calculations in the quote.
              Therefore the final quote recieved will be different from the
              quote generated.
            </Typography>
          </Container>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Home;
