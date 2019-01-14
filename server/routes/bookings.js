const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user')
const BookingController = require('../controllers/booking');

router.post('', UserController.authMiddleware, BookingController.createBooking);

//manage bookings
router.get('/manage', UserController.authMiddleware, BookingController.getBookingsByUser)

module.exports = router; 