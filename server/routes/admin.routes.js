import express from 'express';
import authCtrl from '../controllers/auth.controller.js';
import adminCtrl from '../controllers/admin.controller.js';
import userCtrl from '../controllers/user.controller.js';

const router = express.Router();

router.route('/api/admin/paygrade/:userId')
    .get(authCtrl.requireSignin, authCtrl.hasAdminAuthorization, adminCtrl.getPaygrades)
    .put(authCtrl.requireSignin, authCtrl.hasAdminAuthorization, adminCtrl.updatePaygrade);

router.param('userId', userCtrl.userByID);

export default router;
