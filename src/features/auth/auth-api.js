// Description: This file exports functions for signing in and signing out users.

// Import axios
import axios from "axios";

// This function is used to sign in a user
const signin = async (userData) => {
  const { email, password } = userData;
  try {
    const response = await axios.post("http://localhost:3000/auth/signin", {
      email,
      password,
    });
    return response.data;
  } catch (err) {
    return err.response.data;
  }
};

// This function is used to sign out a user
const signout = async () => {
  try {
    const response = axios.get("http://localhost:3000/auth/signout");
    return response.data;
  } catch (err) {
    return err.response.data;
  }
};

// Export the functions
export { signin, signout };
