// Description: This file contains the functions that handle the authentication of the user.

// Imports
import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import { expressjwt } from "express-jwt";
import config from '../../config/config.js';

// This function is used to sign in a user
const signin = async (req, res) => {
    try {
        let user = await User.findOne({
          "email": req.body.email
        })
        if (!user)
          return res.status(401).json({
            error: "User not found"
          })
    
        if (!user.authenticate(req.body.password)) {
          return res.status(401).send({
            error: "Email and password don't match."
          })
        }
    
        const token = jwt.sign({
          _id: user._id
        }, config.jwtSecret)
    
        res.cookie("t", token, {
          expire: new Date() + 9999
        })
    
        return res.json({
          token,
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            admin: user.admin
          }
        })
      } catch (err) {
        return res.status(401).json({
          error: "Could not sign in"
        })
      } 
}

// This function is used to sign out a user
const signout = (req, res) => {
    res.clearCookie("t")
    return res.status(200).json({
      message: "signed out"
    })  
}

// This function is used to check if the user is signed in
const requireSignin = expressjwt({
    secret: config.jwtSecret,
    userProperty: 'auth',
    algorithms: ['HS256']
  })

// This function is used to check if the user is authorized
const hasAuthorization = (req, res, next) => {
    const authorized = req.profile && req.auth && req.profile._id == req.auth._id
    if (!(authorized)) {
      return res.status(403).json({
        error: "User is not authorized"
      })
    }
    next()
  }

// This function is used to check if the user is an admin
const hasAdminAuthorization = (req, res, next) => {
    const authorized = req.profile && req.auth && req.profile._id == req.auth._id && req.profile.admin
    if (!(authorized)) {
      return res.status(403).json({
        error: "User is not authorized"
      })
    }
    next()
  }

// Export the functions
export default { signin, signout, requireSignin, hasAuthorization, hasAdminAuthorization }
