import express from 'express';
import authCtrl from '../controllers/auth.controller.js';
import adminCtrl from '../controllers/admin.controller.js';
import userCtrl from '../controllers/user.controller.js';

const router = express.Router();

router.route('/api/admin/paygrade/:userId')
    .put(authCtrl.requireSignin, authCtrl.hasAdminAuthorization, adminCtrl.updatePaygrade);

router.route('/api/admin/fudge-factor/:userId')
    .put(authCtrl.requireSignin, authCtrl.hasAdminAuthorization, adminCtrl.updateFudgeFactor);

router.param('userId', userCtrl.userByID);

export default router;
