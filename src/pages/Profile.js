// Description: Profile page

// imports
import React, { useEffect, useState } from "react";
import { getProfile, deleteProfile } from "../features/user/user-api.js";
import { Grid, TextField, Typography, Button } from "@mui/material";

import auth from '../features/auth/auth-helper.js';
import { signout } from '../features/auth/auth-api.js';
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    name: "",
    email: "",
  });

  const handleDelete = () => {
    deleteProfile().then((response) => {
      signout().then((response) => {
        auth.clearToken(() => console.log("signed out"))
      })
      navigate('/login');
    })
  }
    
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
          <TextField label="Name" value={profile.name} fullWidth/>
        </Grid>
        <Grid item mt={"2%"}>
          <TextField label="Email" value={profile.email} fullWidth />
        </Grid>
        <Button onClick={handleDelete}> Delete</Button>
      </Grid>
    </Grid>
  );
};

// Export
export default Profile;
