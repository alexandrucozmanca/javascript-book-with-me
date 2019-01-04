const express = require('express');
const mongoose = require('mongoose');

const config = require('./config/dev');
const Rental = require('./models/rental');
const DbBootstrap = require('./db_bootstrap.js');
const rentalRoutes = require('./routes/rentals');

mongoose.connect(config.DB_URL, { useNewUrlParser: true }).then(() =>{
    const bootstrap = new DbBootstrap();
    bootstrap.seedDb();
});

const app = express();

app.use('/api/v1/rentals', rentalRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, function(){
    console.log('App started');
});

