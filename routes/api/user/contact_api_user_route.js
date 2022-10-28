//import controller
const contactApiUserController = require('../../../controllers/api/user/contact_api_user_controller');

//middleware
const mid = require('../../../middlewares/main_middleware');

//express
const express = require('express');
const route = express.Router();

//import multer for handle parsing data from form data
const multer = require('multer');
const upload = multer();

//create contact self route
route.post('/user/contact/create/self', //route
[mid.userMiddleware, upload.array()], //middleware
contactApiUserController.createContactSelfUser); //controller

//get contact self route
route.get('/user/contact/get/self', //route
[mid.userMiddleware, upload.array()], //middleware
contactApiUserController.getContactSelfUser); //controller

//get contact self by id route
route.get('/user/contact/get/self/id', //route
[mid.userMiddleware, upload.array()], //middleware
contactApiUserController.getContactSelfByIdUser); //controller

//update contact self route
route.put('/user/contact/update/self', //route
[mid.userMiddleware, upload.array()], //middleware
contactApiUserController.updateContactSelfUser); //controller

//delete contact self route
route.delete('/user/contact/delete/self', //route
[mid.userMiddleware, upload.array()], //middleware
contactApiUserController.deleteContactSelfUser); //controller

module.exports = route;