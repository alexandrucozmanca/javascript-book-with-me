const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user');
const RentalController = require('../controllers/rental');

router.get('/secret', UserController.authMiddleware,  function (req, res) {

    res.json({"secret": true});

});

router.get('/:rentalId', RentalController.findRentalById);

router.get('', RentalController.getRentals);

router.post('', UserController.authMiddleware, RentalController.createRental);

module.exports = router; 
