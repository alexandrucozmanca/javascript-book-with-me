const User = require('../models/user');
const { normalizeErrors } = require('../helpers/mongoose');
const jwt = require('jsonwebtoken');
const config = require('../config/dev');

exports.auth = function (req, res) {
    
    const email = req.body.email;   
    const password = req.body.password;
    
    if(!email ||!password){
        return res.status(422)
            .send({errors: [{code: 422 ,title: 'Data missing Error!', detail: 'Provide email and password'}]});
    }
    
    User.findOne({email}, function (err, user){
        if (err){
            return res.status(422)
                    .send({errors: normalizeErrors(err.errors)});
        }
        if(!user){ 
            return res.status(422)
                .send({errors: [{code: 422 ,title: 'Invalid user Error!', detail: 'User does not exist.'}]});

        } 

        if(user.hasSamePassword(password)){
            let token = jwt.sign({
               userId: user.id,
               username: user.username
            }, 
            config.SECRET, {
                expiresIn: '1h'});

            return res.json(token);
        } else {
            return res.status(422)
                .send({errors: [{code: 422 ,title: 'Wrong data Error!', detail: 'Wrong email or password'}]});
        }

    });
}

exports.register = function (req, res) {

    const username = req.body.username;
    const email = req.body.email;   
    const password = req.body.password;
    const passwordConfirmation = req.body.passwordConfirmation;

    if(!username || !email ||!password){
        return res.status(422)
            .send({errors: [{code: 422 ,title: 'Data missing Error!', detail: 'Provide username, email and password'}]});
    }

    if(password !== passwordConfirmation){
        return res.status(422)
             .send({errors: [{code: 422 ,title: 'Mismatch Error!', detail: 'Confirmation password must be same as password'}]});
    }
    
    User.findOne({email}, function (err, existingUser){
        if (err){
            return res.status(422)
                    .send({errors: normalizeErrors(err.errors)});
        }
        if(existingUser){ 
            return res.status(422)
                .send({errors: [{code: 422 ,title: 'Invalid email Error!', detail: 'Email is already in use.'}]});
        }

        const user = new User({
            username,
            email,
            password
        });

        user.save(function(err) {
            if (err) {
                return res.status(422)
                    .send({errors: normalizeErrors(err.errors)});
            }

            return res.json({'register': true});
        })
    });

   
}

exports.authMiddleware = function (req, res, next) {
    const token = req.headers.authorization;

    if(token){
        const user = parserToken(token);

        User.findById(user.userId, function(err, user){
            if(err){
                return res.status(422)
                    .send({errors: normalizeErrors(err.errors)});
            } 

            if (user) {
                res.locals.user = user;
                next();
            } else {
                return notAuthorized(res);
            }
        })
    } else {
        return notAuthorized(res);
    }
}

function parserToken(token) {

    return jwt.verify(token.split(' ')[1], config.SECRET);

}

function notAuthorized(res){
    return res.status(401)
            .send({errors: [{code: 401 ,title: 'Not authorized!', detail: 'You need to login to get access'}]});
}