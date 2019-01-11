const Rental = require('../models/rental');
const User = require('../models/user');
const moment = require('moment');
const { normalizeErrors } = require('../helpers/mongoose');

exports.findRentalById = function(req, res){
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
}

exports.getRentals = function (req, res) {
    const city = req.query.city;
    const query = city ? {city: city.toLowerCase()} : {};

    Rental.find(query)
        .select('-bookings')
        .exec(function(err, foundRentals) { 
            if(err){
                return res.status(422)
                            .send({errors: normalizeErrors(err.errors)});
            }
            if(city && foundRentals.length === 0){
                return res.status(422)
                            .send({errors: [{code: 422 ,title: 'No rentals Found Error!', detail: `There are no rentals for city: ${city}`}]});
            }     
            return res.json(foundRentals);
    });
    
}

exports.createRental = function (req, res) {

    const {title, city, street, category, image, bedrooms, shared, description, dailyRate } = req.body;
    const user = res.locals.user;
    const bookings = [];
    const createdAt = moment();
    
    if(!title || !city || !street  || !category ||!image || !bedrooms  || !shared  || !description  || !dailyRate ){
        return res.status(422)
            .send({errors: [{code: 422 ,title: 'Data missing Error!', detail: 'Provide all needed information'}]});
    }
    
    const rental = new Rental({
        title,
        city,
        street,
        category,
        image,
        bedrooms,
        shared,
        description,
        dailyRate,
        createdAt
    });

    rental.user = user;
    rental.bookings = bookings;

    rental.save(function(err) {
        if (err) {
            return res.status(422)
                .send({errors: normalizeErrors(err.errors)});
        }

        User.updateOne({_id: user.id}, {$push: {rentals: rental}}, function(){});      
        return res.json(rental);
        
    });

   
}