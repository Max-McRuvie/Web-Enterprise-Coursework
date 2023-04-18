// Description: This file contains all the routes for the authentication controller

// Imports
import express from 'express';
import authCtrl from '../controllers/auth.controller.js';

const router = express.Router();

// Signin route
router.route('/auth/signin')
    .post(authCtrl.signin);

// Signout route
router.route('/auth/signout')
    .get(authCtrl.signout);

// Export the router
export default router;
