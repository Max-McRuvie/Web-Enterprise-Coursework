// Description: This file contains functions that validate the user's input

// Imports
import validator from "validator";

// Validate password function
const validatePassword = (password, isSignin) => {
  // Check if password is empty
  if (!password && isSignin) {
    return "Password is required";
  }

  // Check if password less than 8 characters long
  if (password.length < 8 && !isSignin) {
    return "Password must be at least 8 characters long";
  }

  // Check if password is strong
  if (!validator.isStrongPassword(password) && !isSignin) {
    return "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character";
  }

  return "";
};

// Validate email function
const validateEmail = (email) => {
  // Check if email is empty
  if (!email) {
    return "Email is required";
  }

  // Check if email is valid
  if (!validator.isEmail(email)) {
    return "Email is invalid";
  }

  return "";
};

// Validate form title input function
const validateTitle = (title) => {
  // Check if title is empty
  if (!title) {
    return "Title is required";
  }

  // Check if title is at least 3 characters long
  if (title.length < 3) {
    return "Title must be at least 3 characters long";
  }

  return "";
};

export { validatePassword, validateEmail, validateTitle };
