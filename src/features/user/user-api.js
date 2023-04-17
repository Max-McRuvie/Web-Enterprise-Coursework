// Description: This file exports functions for signing up and logging in users.

// Import axios
import axios from "axios";

// This function is used to sign up a user
const signup = async (userData) => {
  let data = {
    name: userData.name,
    email: userData.email,
    password: userData.password,
  };
  
  try {
    const response = await axios.post("http://localhost:3000/api/users", data);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 400 && error.response.data.error === "Email already exists") {
      throw new Error("Email already exists");
    }
    throw error;
  }
};

// This function is used to get the profile of a user
const getProfile = () => {
  let item = sessionStorage.getItem("auth");
  const data = JSON.parse(item);
  let userID = data.user._id;

  return axios
    .get(`http://localhost:3000/api/users/${userID}`, {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    })
    .then((response) => {
      return response.data;
    });
};

const updateProfile = (userData) => {
  let item = sessionStorage.getItem("auth");
  const data = JSON.parse(item);
  let userID = data.user._id;

  return axios
    .put(`http://localhost:3000/api/users/${userID}`, userData, {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    })
    .then((response) => {
      return response.data;
    }).catch((error) => {
      if (error.response && error.response.data && error.response.data.error) {
        throw new Error(error.response.data.error);
      } else {
        throw new Error('Something went wrong.');
      }
    });
};

const deleteProfile = () => {
  let item = sessionStorage.getItem("auth");
  const data = JSON.parse(item);
  let userID = data.user._id;

  console.log(userID)

  return axios
    .delete(`http://localhost:3000/api/users/${userID}`, {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    })
    .then((response) => {
      return response.data;
    });
};


// Export the functions
export { signup, getProfile, updateProfile, deleteProfile };
