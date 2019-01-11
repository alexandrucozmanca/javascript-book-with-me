const Rental = require('./models/rental');
const User = require('./models/user');
const Booking = require('./models/booking');
const dbData = require('./data.json');

class DBBootstrap {
    constructor(){
        this.rentals = dbData.rentals;
        this.users = dbData.users;
    }

    pushDataToDb() {
        const user = new User(this.users[0]);
        const user1 = new User(this.users[1]);

        this.rentals.forEach((rental) =>{
            const newRental = new Rental(rental);
            newRental.user = user;

            user.rentals.push(newRental);
            newRental.save();
        });

        user.save();
        user1.save();
    };

    
    async cleanDb() {
        await User.deleteMany({});
        await Rental.deleteMany({});
        await Booking.deleteMany({});
    };

    async seedDb() {
        await this.cleanDb();
        this.pushDataToDb();

    }

   
 }

 module.exports = DBBootstrap;