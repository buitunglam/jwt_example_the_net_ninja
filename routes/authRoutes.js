const {Router} = require('express');
const authController = require('../controller/authController'); 
const routes = Router();

routes.get('/login', authController.login_get);
routes.post('/login', authController.login_post);
routes.get('/signup', authController.signup_get);
routes.post('/signup', authController.signup_post);
routes.get('/logout', authController.logout_get);

module.exports = routes;
