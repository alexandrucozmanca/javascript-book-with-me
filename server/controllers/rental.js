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
                return res.status(422)
                    .send({errors: [{code: 422 ,title: 'No rentals Found Error!', detail: `There are no rental with id: ${rentalId}`}]});
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
    
    if(!title || !city || !street  || !category ||!image || !bedrooms || !description  || !dailyRate ){
        return res.status(422)
            .send({errors: normalizeErrors(err.errors)});
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

exports.deleteRentalById = function(req, res) {
    const user = res.locals.user;

    Rental
        .findById(req.params.rentalId)
        .populate('user', '_id')
        .populate({
            path: 'bookings',
            select: 'startAt',
            match: { startAt: { $gt: new Date()}}
        })
        .exec(function(err, foundRental) {
            if(err){
                return res.status(422)
                    .send({errors: normalizeErrors(err.errors)});
            }

            if(user.id !== foundRental.user.id){
                return res.status(422)
                    .send({errors: [{code: 422 ,title: 'Invalid User!', detail: 'You can not delete another owner`s rentals'}]});
            }

            if(foundRental.bookings.length > 0){
                return res.status(422)
                    .send({errors: [{code: 422 ,title: 'Active Bookings!', detail: 'You can not delete a rental with active upcoming bookings'}]});
            }
        
            foundRental.remove(err, () =>{
                if (err){
                return res.status(422)
                    .send({errors: normalizeErrors(err.errors)});
                }
                
                return res.json({'status':'deleted'});
            });
    });
}

exports.getRentalsByUser = function(req, res) {
    user = res.locals.user;

    Rental
        .where({user})
        .populate('bookings')
        .exec(function(err, foundRentals) { 
            if(err){
                return res.status(422)
                            .send({errors: normalizeErrors(err.errors)});
            }
           
            return res.json(foundRentals);
    });
}

exports.updateRentalById = function (req, res) {
  const rentalData = req.body;
  const user = res.locals.user;

  Rental
    .findById(req.params.rentalId)
    .populate('user')
    .exec(function(err,foundRental){
      if(err){
        return res.status(422)
          .send({errors: normalizeErrors(err.errors)});
      }

      console.log(foundRental);

      if(foundRental.user.id !== user .id){
        return res.status(422)
          .send({errors: [{code: 422 ,title: 'Invalid User!', detail: 'You can not modify another owner`s rentals'}]});
      }

      foundRental.set(rentalData);
      foundRental.save(function (err) {
        if (err) {
          return res.status(422)
            .send({errors: normalizeErrors(err.errors)});
        }
        return res.status(200).send(foundRental);
      });
    });
  
}

exports.verifyOwnerId = function (req, res) {
  const user = res.locals.user;
  Rental
    .findById(req.params.id)
    .populate('user')
    .exec(function (err, foundRental) {
      debugger
      if (err){
        return res.status(422)
          .send({errors: normalizeErrors(err.errors)});
      }
      if(String(foundRental.user._id) !== String(user._id)){
        return res.status(422)
          .send({errors: [{code: 422 ,title: 'Invalid User!', detail: 'You are not the owner of this rental'}]});
      }

      return res.json({'status': 'verified'});
    })
}
