// Description: This file contains the authentication helper functions

// Auth object containing authenticaion functions
const auth = {
  // This function is used to check if a user is authenticated
  isAuthenticated() {
    if (sessionStorage.getItem("auth")) {
      return JSON.parse(sessionStorage.getItem("auth"));
    } else {
      return false;
    }
  },

  // This function is used to authenticate a user
  authenticate(userData) {
    sessionStorage.setItem("auth", JSON.stringify(userData));
  },

  // This function is used to clear the authentication token
  clearToken(callback) {
    sessionStorage.removeItem("auth");
  },

  // This function is used to check if a user is an admin
  isAdmin() {
    if (sessionStorage.getItem("auth")) {
      return JSON.parse(sessionStorage.getItem("auth")).user.admin === true;
    } else {
      return false;
    }
  },
};

// Export the auth object
export default auth;
