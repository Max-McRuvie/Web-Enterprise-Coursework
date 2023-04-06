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
    return await axios
      .post("http://localhost:3000/api/users", data)
      .then((response) => {
        return response.data;
      });
  } catch (error) {
    return error;
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

// Export the functions
export { signup, getProfile };
