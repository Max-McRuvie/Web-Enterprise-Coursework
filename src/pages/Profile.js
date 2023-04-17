// Description: Profile page

// imports
import React, { useEffect, useState } from "react";
import { getProfile, updateProfile, deleteProfile } from "../features/user/user-api.js";
import { Grid, TextField, Typography, Button } from "@mui/material";

import auth from '../features/auth/auth-helper.js';
import { signout } from '../features/auth/auth-api.js';
import { useNavigate } from "react-router-dom";

import { validateName, validateEmail, validatePassword } from "../features/validation.js";

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    currentPassword: "",
    newPassword: "",
  });

  // Handle change in input fields
  const handleChange = (event) => {
    setProfile({ ...profile, [event.target.name]: event.target.value });
  };

  // Handle updating the profile
  const handleUpdate = () => {
    // Validate fields
    const nameError = validateName(profile.name, false);
    const emailError = validateEmail(profile.email, false);

    // Check if passwords match
    if(profile.newPassword !== profile.confirmNewPassword) {
      alert("Passwords do not match");
      return;
    }

    // Check if password is valid
    if(profile.newPassword) {
      const passwordError = validatePassword(profile.newPassword, false);
      if(passwordError) {
        alert(passwordError);
        return;
      }
    }

    // Check name and email are valid
    if (nameError || emailError) {
      alert(nameError || emailError);
      return;
    }

    // Check current password is entered
    if(!profile.currentPassword) {
      alert("Please enter your current password");
      return;
    }
    
    // Update profile
    updateProfile(profile).then((response) => {
      alert("Profile updated successfully")
    }).catch((error) => {
      alert(error);
    })
  };

  // Handle deleting the profile
  const handleDelete = () => {
    deleteProfile().then(() => {
      signout().then(() => {
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
          <TextField label="Name" name="name" value={profile.name} onChange={(event) => handleChange(event)} fullWidth/>
        </Grid>
        <Grid item mt={"2%"}>
          <TextField label="Email" name="email" value={profile.email} onChange={(event) => handleChange(event)} fullWidth />
        </Grid>
        <Grid item mt={"2%"}>
          <TextField label="New Password" name="newPassword" type="password" value={profile.newPassword} onChange={(event) => handleChange(event)} fullWidth />
        </Grid>
        <Grid item mt={"2%"}>
          <TextField label="Confirm New Password" name="confirmNewPassword" type="password" value={profile.confirmNewPassword} onChange={(event) => handleChange(event)} fullWidth />
        </Grid>
        <Grid item mt={"2%"}>
          <TextField label="Current Password" name="currentPassword" type="password" value={profile.currentPassword} onChange={(event) => handleChange(event)} fullWidth />
        </Grid>
        <Grid item mt={"2%"}>
          <Button onClick={handleUpdate}>Update</Button>
        </Grid>
        <Grid item mt={"2%"}>
          <Button onClick={handleDelete}>Delete</Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

// Export
export default Profile;
