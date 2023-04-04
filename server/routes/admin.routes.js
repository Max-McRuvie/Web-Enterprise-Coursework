import express from 'express';
import authCtrl from '../controllers/auth.controller.js';
import adminCtrl from '../controllers/admin.controller.js';

const router = express.Router();

route.route('/api/admin/paygrade')
    .update(authCtrl.requireSignin, authCtrl.hasAdminAuthorization, adminCtrl.updatePaygrade);

router.route('api/admin/fudge-factor')
    .update(authCtrl.requireSignin, authCtrl.hasAdminAuthorization, adminCtrl.updateFudgeFactor);


