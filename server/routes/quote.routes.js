import express from 'express';
import userCtrl from '../controllers/user.controller.js';
import authCtrl from '../controllers/auth.controller.js';
import quoteCtrl from '../controllers/quote.controller.js';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/api/calculation')
    .post(authCtrl.requireSignin, quoteCtrl.calculateQuote);

router.route('/api/quotes')
    .post(authCtrl.requireSignin, quoteCtrl.createQuote);
    
router.route('/api/:userId/quotes')
    .get(authCtrl.requireSignin, quoteCtrl.listQuotes)
    .delete(authCtrl.requireSignin, quoteCtrl.removeQuote);

router.route('/api/quotes/:quoteId')
    .get(authCtrl.requireSignin, quoteCtrl.getQuoteByID)
    .put(authCtrl.requireSignin, authCtrl.hasAuthorization, quoteCtrl.updateQuote);

router.route('/api/:userId/quotes/combine')
    .post(authCtrl.requireSignin, quoteCtrl.combineQuotes)
    
export default router;
