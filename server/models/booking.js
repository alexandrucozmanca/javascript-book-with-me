const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    startAt: {
        type: Date, 
        required: [true, 'Starting date is required']
    },
    endAt: {
        type: Date,
        required: [true, 'Ending date is required']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    days: Number,
    totalPrice: Number,
    guests: Number,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    rental: {
        type: Schema.Types.ObjectId,
        ref: 'Rental'
    },
    payment: {
      type: Schema.Types.ObjectId,
      ref: "Payment"
    },
    status: {type: String, default: 'pending'}
});

module.exports = mongoose.model('Booking', bookingSchema);
