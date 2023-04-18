import express from 'express';
import authCtrl from '../controllers/auth.controller.js';

const router = express.Router();

// Signin route
router.route('/auth/signin')
    .post(authCtrl.signin);

// Signout route
router.route('/auth/signout')
    .get(authCtrl.signout);

export default router;
