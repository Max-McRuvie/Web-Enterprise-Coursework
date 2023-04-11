// imports
import React, { useEffect, useState } from "react";
import { getProfile } from "../features/user/user-api.js";
import { Grid, TextField, Typography } from "@mui/material";

const Profile = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
  });

  // Get profile on page load
  useEffect(() => {
    getProfile()
      .then((response) => {
        setProfile({
          name: response.name,
          email: response.email,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Grid container spacing={2} justifyContent={"center"} marginTop={"2%"}>
      <Grid container item xs={5} direction="column">
        <Grid item mt={"5%"} mb={"5%"}>
          <Typography variant="h4" m={"5%"}>
            Profile
          </Typography>
        </Grid>
        <Grid item mt={"5%"}>
          <TextField label="Name" value={profile.name} fullWidth disabled />
        </Grid>
        <Grid item mt={"2%"}>
          <TextField label="Email" value={profile.email} fullWidth disabled />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Profile;
