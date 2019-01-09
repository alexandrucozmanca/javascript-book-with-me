const express = require('express');
const router = express.Router();

const User = require('../controllers/user')
const Booking = require('../controllers/booking');

router.post('',User.authMiddleware, Booking.createBooking);

module.exports = router; 