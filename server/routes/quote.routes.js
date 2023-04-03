import express from 'express';
import userCtrl from '../controllers/user.controller.js';
import authCtrl from '../controllers/auth.controller.js';
import quoteCtrl from '../controllers/quote.controller.js';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/api/calculation')
    .post(quoteCtrl.calculateQuote);

router.route('/api/quotes')
    .post(quoteCtrl.createQuote);
    

router.route('/api/:userId/quotes')
    .get(quoteCtrl.listQuotes)
    .delete(quoteCtrl.removeQuote);

router.route('/api/quotes/:quoteId')
    .get(quoteCtrl.getQuoteByID)
    .put(quoteCtrl.updateQuote);

router.route('/api/:userId/quotes/combine')
    .post(quoteCtrl.combineQuotes)
export default router;
