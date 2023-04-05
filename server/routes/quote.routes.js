import express from 'express';
import userCtrl from '../controllers/user.controller.js';
import authCtrl from '../controllers/auth.controller.js';
import quoteCtrl from '../controllers/quote.controller.js';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/api/calculation')
    .post(authCtrl.requireSignin, quoteCtrl.calculateQuote);

router.route('/api/quotes')
    .post(authCtrl.requireSignin, quoteCtrl.createQuote);
    
router.route('/api/quotes/:userId')
    .get(authCtrl.requireSignin, authCtrl.hasAuthorization, quoteCtrl.listQuotes)
    .post(authCtrl.requireSignin, authCtrl.hasAuthorization, quoteCtrl.combineQuotes)
    .delete(authCtrl.requireSignin, authCtrl.hasAuthorization,quoteCtrl.removeQuote);

router.route('/api/quotes/:quoteId/:userId')
    .get(authCtrl.requireSignin, authCtrl.hasAuthorization,quoteCtrl.getQuoteByID)
    .post(authCtrl.requireSignin, authCtrl.hasAuthorization, quoteCtrl.updateQuote);

router.param('userId', userCtrl.userByID);

export default router;
