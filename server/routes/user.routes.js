// Description: This file contains all the routes for the user model

// Imports
import express from 'express';
import userCtrl from '../controllers/user.controller.js';
import authCtrl from '../controllers/auth.controller.js';

const router = express.Router(); // eslint-disable-line new-cap

// Route for creating a new user
router.route('/api/users')
  .post(userCtrl.create)

// Route for getting user by id and updating user by id
router.route('/api/users/:userId')
    .get(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.read)
    .put(authCtrl.requireSignin, authCtrl.hasAuthorization,userCtrl.update)
    .delete(authCtrl.requireSignin, authCtrl.hasAuthorization,userCtrl.remove);

router.param('userId', userCtrl.userByID);

// Export the router
export default router;