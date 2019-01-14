const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user');
const RentalController = require('../controllers/rental');

router.get('/secret', UserController.authMiddleware,  function (req, res) {

    res.json({"secret": true});

});

// get rental by ID
router.get('/:rentalId', RentalController.findRentalById);

// get all rentals
router.get('', RentalController.getRentals);

// create rental
router.post('', UserController.authMiddleware, RentalController.createRental);

module.exports = router; 
