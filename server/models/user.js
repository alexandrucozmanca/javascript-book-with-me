const bcrypt = require('bcrypt'); 
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        min: [4, 'User name to short, min 4'],
        max: [32, 'Username to long, max 32.']
    },
    email: {
        type: String,
        required: 'Email is required',
        lowercase: true,
        unique: true,
        min: [4, 'Email to short, min 4'],
        max: [32, 'Email to long, max 32.'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
    },
    password: {
        type: String,
        required: true,
        min: [4, 'Password to short, min 4'],
        max: [32, 'Password to long, max 32.']
    },
    stripeCustomerId: String,
    revenue: Number,
    rentals: [{
        type: Schema.Types.ObjectId,
        ref: 'Rental'
    }],
    bookings: [{
        type: Schema.Types.ObjectId,
        ref: 'Booking'
    }]
});

userSchema.pre('save', function(next){
    const user = this;

    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(user.password, salt, function(err, hash) {
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.hasSamePassword = function(requestedPassword){

    return bcrypt.compareSync(requestedPassword, this.password);
}

module.exports = mongoose.model('User', userSchema);
