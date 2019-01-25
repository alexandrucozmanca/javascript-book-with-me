const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const config = require('./config/');
const DbBootstrap = require('./db_bootstrap.js');

const rentalRoutes = require('./routes/rentals');
const userRoutes = require('./routes/users');
const bookingRoutes = require('./routes/bookings');
const path = require('path');



mongoose.connect(config.DB_URI, { useNewUrlParser: true }).then(() =>{
    
    if(process.env.NODE_ENV !== 'production'){
        const bootstrap = new DbBootstrap();
        //bootstrap.seedDb();
    }
    

});

const app = express();

app.use(bodyParser.json());

app.use('/api/v1/rentals', rentalRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/bookings', bookingRoutes);

if(process.env.NODE_ENV === 'production'){

    const appPath = path.join(__dirname, '..', 'dist/javascript-book-with-me');
    app.use(express.static(appPath));
    app.get('*', function(req, res){
        res.sendFile(path.resolve(appPath,'index.html'));
    });
}

const PORT = process.env.PORT || 3001;

app.listen(PORT, function(){
    console.log('App started');
});

