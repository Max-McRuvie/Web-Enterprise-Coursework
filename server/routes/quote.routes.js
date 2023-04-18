// Description: This file contains all the routes for the quote controller

// Imports
import express from 'express';
import userCtrl from '../controllers/user.controller.js';
import authCtrl from '../controllers/auth.controller.js';
import quoteCtrl from '../controllers/quote.controller.js';

const router = express.Router(); // eslint-disable-line new-cap

// route for getting calculation
router.route('/api/calculation')
    .post(authCtrl.requireSignin, quoteCtrl.calculateQuote);

// route for creating quote 
router.route('/api/quotes')
    .post(authCtrl.requireSignin, quoteCtrl.createQuote);
    
// route for listing, combining & removing quotes
router.route('/api/quotes/:userId')
    .get(authCtrl.requireSignin, authCtrl.hasAuthorization, quoteCtrl.listQuotes)
    .post(authCtrl.requireSignin, authCtrl.hasAuthorization, quoteCtrl.combineQuotes)
    .delete(authCtrl.requireSignin, authCtrl.hasAuthorization,quoteCtrl.removeQuote);

// Route for getting quote by id & updating quote by id
router.route('/api/quotes/:quoteId/:userId')
    .get(authCtrl.requireSignin, authCtrl.hasAuthorization,quoteCtrl.getQuoteByID)
    .put(authCtrl.requireSignin, authCtrl.hasAuthorization, quoteCtrl.updateQuote);

router.param('userId', userCtrl.userByID);

// Export the router
export default router;
