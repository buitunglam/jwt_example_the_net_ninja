const jwt = require('jsonwebtoken');
const User = require('../model/User');

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token, 'the net ninja secret', (err, decoded) => {
            console.log(err);
            if(err){
                res.redirect('login');
            } else {
                next();
            }
            
        })
    } else {
        res.redirect('login');
    }
}

const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token, 'the net ninja secret', async (err, decoded) => {
            console.log('decode...', decoded);
            if(err){
                next();
            } else {
                const user = await User.findById(decoded.id);
                res.locals.user = user;
                next();
            }
        })
    } else {
        res.locals.user = null;
        console.log('vao else...', res.locals.user);
        next();
    }
}

module.exports = {requireAuth, checkUser};