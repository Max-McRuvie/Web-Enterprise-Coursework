import User from '../models/user.model.js';
import lodash from 'lodash';
import errorHandler from './../helpers/dbErrorHandler.js';

// Import for validaiton and sanitisation
import validator from "validator";
import DOMPurify from 'dompurify';

// Create a new user
const create = async (req, res) => {
  const { email } = req.body;
  
  // Validate email
  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: "Invalid email format" });
    }

  // Check for invalid characters
  const invalidChars = /[^a-zA-Z0-9@._-]/g;
  if (invalidChars.test(email)) {
    return "Email can only contain letters, numbers, and @._-";
  }
  const sanitisedEmail = DOMPurify.sanitize(email);
  
  // Check if email contains invalid characters
  if(sanitisedEmail !== email) {
    return "Email must not contain HTML tags";
  }

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ error: "Email already exists" });
  }

  // Create new user
    const user = new User(req.body)
    try {
        await user.save()
        return res.status(200).json({
          message: "Successfully signed up!"
        })
      } catch (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err)
        })
      }
}

// List all users
const list = async (req, res) => {
  try {
    let users = await User.find()
    res.json(users)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

// Find user by ID
const userByID = async (req, res, next, id) => {
  try {
    let user = await User.findById(id)
    if (!user)
      return res.status('400').json({
        error: "User not found"
      })
    req.profile = user
    next()
  } catch (err) {
    return res.status('400').json({
      error: "Could not retrieve user"
    })
  }
}

// Read user profile
const read = (req, res) => {
    req.profile.hashed_password = undefined
    req.profile.salt = undefined
    return res.json(req.profile)
}

// Update user profile
const update = async (req, res) => {
  try {
    let user = req.profile
    user = lodash.extend(user, req.body)
    user.updated = Date.now()
    await user.save()
    user.hashed_password = undefined
    user.salt = undefined
    res.json(user)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

// Delete user profile
const remove = async (req, res) => {
  try {
    let user = req.profile
    let deletedUser = await User.deleteOne(user)
    deletedUser.hashed_password = undefined
    deletedUser.salt = undefined
    res.json(deletedUser)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

export default { create, userByID, read, list, remove, update }