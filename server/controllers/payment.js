const Payment = require('../models/payment');
const User = require('../models/user');
const Booking = require('../models/booking');
const Rental = require('../models/rental')
const { normalizeErrors } = require('../helpers/mongoose');
const config = require('../config')
const stripe = require('stripe')(config.STRIPE_SECRET_KEY);

exports.getPendingPayments = function (req, res) {
  const user = res.locals.user;

  console.log(user);
  Payment
    .where({payeeUser: user})
    .populate({
      path: 'booking',
      populate: {path: 'rental'}
    })
    .populate('payerUser')
    .exec( function(err, foundPayments) {
      if (err) {
        return res.status(422).send({errors: normalizeErrors(err.errors)});
      }
      console.log(foundPayments);
      return res.json(foundPayments);
    })
}

exports.confirmPayment = function (req, res) {
  const payment = req.body;

  const user = res.locals.user;

  Payment.findById(payment._id)
    .populate('payeeUser')
    .populate('booking')
    .exec( async function (err, foundPayment) {
      if(err){
        return res.status(422).send({errors: normalizeErrors(err.errors)});
      }

      if(foundPayment.status === 'pending' && user.id === foundPayment.payeeUser.id) {
        const booking = foundPayment.booking;

        const charge = await stripe.charges.create({
          amount: booking.totalPrice * 100,
          currency: 'usd',
          customer: payment.fromStripeCustomerId
        });

        if(charge) {
          Booking.updateOne({_id: booking.id}, {status: 'active'}, function () {});
          foundPayment.charge = charge;
          foundPayment.status = 'paid';

          foundPayment.save((err) =>{
            if(err){
              return res.status(422).send({errors: normalizeErrors(err.errors)});
            }
            User.updateOne({_id: foundPayment.payeeUser}, {$inc: {revenue: foundPayment.amount}},
              function(err, user) {
                if(err) {
                  return res.status(422).send({errors: normalizeErrors(err.errors)});
                }

                return res.json({status: 'paid'});
              });
          })
        }
      }
    });
}

exports.declinePayment = function (req, res) {
  const payment = req.body;
  const {booking} = payment;

  Booking.deleteOne({_id: booking._id}, (err, deletedBooking) => {
    if(err) {
      return res.status(422).send({errors: normalizeErrors(err.errors)});
    }
    Payment.updateOne({_id: payment._id}, {status: 'declined'}, function() {});
    Rental.updateOne({_id: booking.rental}, {$pull: {bookings: booking._id}}, function() {});


    return res.json({status: 'deleted'});
  })

}
