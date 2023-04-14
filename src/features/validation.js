// Description: This file contains functions that validate the user's input

// Imports
import validator from "validator";
import DOMPurify from 'dompurify';

// Validate name function
const validateName = (name) => {
  // Sanitize name input to prevent XSS
  const sanitisedName = DOMPurify.sanitize(name);

  if(sanitisedName !== name) {
    return "Name must not contain HTML tags";
  }

  // Check if name is empty
  if (!sanitisedName) {
    return "Name is required";
  }

  // Check if name is valid
  if (!validator.isAlpha(sanitisedName)) {
    return "Name can only contain letters";
  }

  return "";
}

// Validate email function
const validateEmail = (email) => {
  // Sanitize email input to prevent XSS
  const sanitisedEmail = DOMPurify.sanitize(email);

  // Check if email contains invalid characters
  if(sanitisedEmail !== email) {
    return "Email must not contain HTML tags";
  }

  // Check if email is empty
  if (!sanitisedEmail) {
    return "Email is required";
  }

  // Check if email is valid
  if (!validator.isEmail(sanitisedEmail)) {
    return "Email is invalid";
  }

  const invalidChars = /[^a-zA-Z0-9@._-]/g;
    if (invalidChars.test(email)) {
      return "Email can only contain letters, numbers, and @._-";
    }

  return "";
};

// Validate password function
const validatePassword = (password, isSignin) => {
  // Sanitize password input to prevent XSS
  const sanitisedPassword = DOMPurify.sanitize(password);

  // Check if email contains invalid characters
  if(sanitisedPassword !== password) {
    return "Email must not contain HTML tags";
  }
  
  // Check if password is empty
  if (!sanitisedPassword && isSignin) {
    return "Password is required";
  }

  // Check if password less than 8 characters long
  if (sanitisedPassword.length < 6 && !isSignin) {
    return "Password must be at least 6 characters long";
  }

  // // Check if password is strong
  // if (!validator.isStrongPassword(password) && !isSignin) {
  //   return "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character";
  // }

  return "";
};


  

// Validate form title input function
const validateTitle = (title) => {
  // Sanitize title input to prevent XSS
  const sanitisedTitle = DOMPurify.sanitize(title);

  if(sanitisedTitle !== title) {
    return "Title must not contain HTML tags";
  }

  // Check if title is empty
  if (!sanitisedTitle) {
    return "Title is required";
  }

  // Check if title is at least 3 characters long
  if (sanitisedTitle.length < 3) {
    return "Title must be at least 3 characters long";
  }

  return "";
};

export { validateName, validateEmail, validatePassword, validateTitle };
