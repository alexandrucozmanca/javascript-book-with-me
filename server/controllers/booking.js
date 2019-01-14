const Booking = require('../models/booking');
const Rental = require('../models/rental');
const User = require('../models/user');
const moment = require('moment');

const { normalizeErrors } = require('../helpers/mongoose');

function isValidBooking(proposedBooking, rental) {
    let isValid = true;
  
    if (rental.bookings && rental.bookings.length > 0) {
  
      isValid = rental.bookings.every(function(booking) {
        const proposedStart = moment(proposedBooking.startAt);
        const proposedEnd = moment(proposedBooking.endAt);
  
        const actualStart = moment(booking.startAt);
        const actualEnd = moment(booking.endAt);
  
        return ((actualStart < proposedStart && actualEnd < proposedStart) || (proposedEnd < actualEnd && proposedEnd < actualStart));
      });
    }
  
    return isValid;
}

exports.createBooking = async function(req, res) {

    const {startAt, endAt, createdAt, days, totalPrice, guests, rental } = req.body;
    const user = res.locals.user;

    const booking = new Booking({startAt, endAt, createdAt, days, totalPrice, guests});

    await Rental.findById(rental._id)
        .populate('bookings')
        .populate('user')
        .exec(async function(err, foundRental){
            if(err){
                return res.status(422)
                    .send({errors: normalizeErrors(err.errors)});
            }

            if(foundRental.user.id === user.id){
                return res.status(422)
                    .send({errors: [{code: 422 ,title: 'Invalid user Error!', detail: 'Can not create a booking on your own rental'}]});
            }

            if(isValidBooking(booking, foundRental)){
                booking.user = user;
                booking.rental = foundRental;
                foundRental.bookings.push(booking);

                await booking.save(async function(err)  {
                      if(err){
                        return res.status(422)
                            .send({errors: normalizeErrors(err.errors)});
                    }

                   await foundRental.save();

                   User.updateOne({_id: user.id}, {$push: {bookings: booking }}, function(){});
                });

                return res.json({startAt: booking.startAt, endAt: booking.endAt});
            } else {
                return res.status(422)
                    .send({errors: [{code: 422 ,title: 'Invalid Booking Error!', detail: 'Choosen dates are already taken!'}]});
            }
    });
}

exports.getBookingsByUser = function(req, res) {
    user = res.locals.user;

    Booking
        .where({user})
        .populate('rental')
        .exec(function(err, foundBookings) { 
            if(err){
                return res.status(422)
                            .send({errors: normalizeErrors(err.errors)});
            }
           
            return res.json(foundBookings);
    });
}