import User from '../models/user.model.js';
import lodash from 'lodash';
import errorHandler from './../helpers/dbErrorHandler.js';

// Create a new user
const create = async (req, res, next) => {
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
const list = async (req, res, next, id) => {
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

// Find user by ID
const userByID = async (req, res, next, id) => {
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

// Read user profile
const read = (req, res) => {
    req.profile.hashed_password = undefined
    req.profile.salt = undefined
    return res.json(req.profile)
}

// Update user profile
const update = async (req, res, next) => {
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

// Delete user profile
const remove = async (req, res, next) => {
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

export default { create, userByID, read, list, remove, update }