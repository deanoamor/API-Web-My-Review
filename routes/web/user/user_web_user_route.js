//import controller
const userWebUserController = require('../../../controllers/web/user/user_web_user_controller');

//express
const express = require('express');
const route = express.Router();
const path = require('path');

//import body parser for handle parsing data from form data
const bodyParser = require('body-parser');

//show html email verification page route
route.post('/user/email/verified/page', //route
bodyParser.urlencoded({extended:false}), //middleware
userWebUserController.verfiedEmailPageUserUser); //controller

//email verification function route
route.post('/user/email/verified/process', //route
bodyParser.urlencoded({extended:false}), //middleware
userWebUserController.verifiedEmailUserUser); //controller

module.exports = route;