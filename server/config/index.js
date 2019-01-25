if(process.env.NODE_ENV === 'production'){
    console.log('in prod')
    module.exports = require('./prod');
}
else{

    module.exports = require('./dev');
} 