const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user');
const PaymentController = require('../controllers/payment');

//manage bookings
router.get('', UserController.authMiddleware, PaymentController.getPendingPayments);
router.post('/accept', UserController.authMiddleware, PaymentController.confirmPayment);
router.post('/decline', UserController.authMiddleware, PaymentController.declinePayment);

module.exports = router;
