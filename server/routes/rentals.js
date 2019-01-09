const express = require('express');
const router = express.Router();

const Rental = require('../models/rental');

const UserController = require('../controllers/user');

router.get('/secret', UserController.authMiddleware,  function (req, res) {

    res.json({"secret": true});

});

router.get('', function (req, res) {
    Rental.find({})
        .select('-bookings')
        .exec(function(err, foundRentals) {      
            res.json(foundRentals);
    })
});

router.get('/:rentalId', function(req, res){
    const rentalId = req.params.rentalId;
 
    Rental.findById(rentalId)
        .populate('user', 'username -_id')
        .populate('bookings', 'startAt endAt -_id')
        .exec(function(err, foundRental) {
            if(err){
                res.status(422).send({errors: [{code: 422 ,title: 'Rental Error!', detail: 'Could not find rental'}]});
            }
        
             res.json(foundRental);
    })
});

module.exports = router; 