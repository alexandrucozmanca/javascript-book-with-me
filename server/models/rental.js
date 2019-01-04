const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rentalSchema = new Schema({
    title: {type: String, required: true, max: [128, 'Title to long, max 128.']},
    city: {type: String, required: true, lowercase: true},
    street: {type: String, required: true, min: [4, 'Street name to short, min 4']},
    category: {type: String, required: true, lowercase: true},
    image: {type: String, required: true},
    bedroom: Number,
    shared: Boolean,
    description: {type: String, required: true},
    dailyRate: Number,
    date: {type: Date, default: Date.now},
});

module.exports = mongoose.model('Rental', rentalSchema);

