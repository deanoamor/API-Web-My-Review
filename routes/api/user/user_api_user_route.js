//import controller
const userApiUserController = require('../../../controllers/api/user/user_api_user_controller');

//middleware
const mid = require('../../../middlewares/main_middleware');

//express
const express = require('express');
const route = express.Router();

//import multer for handle parsing data from form data
const multer = require('multer');
const upload = multer();

//register user route
route.post('/user/user/register', //route
upload.array(), //middleware
userApiUserController.registerUserUser); //controller

//login user route
route.post('/user/user/login', //route
upload.array(), //middleware
userApiUserController.loginUserUser); //controller

//get user self route
route.get('/user/user/get/self', //route
[mid.userMiddleware, mid.authMiddlweware.isActiveUser], //middleware
userApiUserController.getProfileSelfUserUser); //controller

//get user all route
route.get('/user/user/get/all', //route
[mid.userMiddleware, mid.authMiddlweware.isActiveUser, upload.array()], //middleware
userApiUserController.getProfileAllUserUser); //controller

//get user by id route
route.get('/user/user/get/byid', //route
[mid.userMiddleware, mid.authMiddlweware.isActiveUser, upload.array()], //middleware
userApiUserController.getProfileByIdUserUser); //controller

//update user photo route
route.put('/user/user/update/photo', //route
[mid.userMiddleware ,mid.authMiddlweware.isActiveUser, upload.single('image_name_user')], //middleware
userApiUserController.uploadPhotoUserUser); //controller

//update user description route
route.put('/user/user/update/description', //route
[mid.userMiddleware, mid.authMiddlweware.isActiveUser, upload.array()], //middleware
userApiUserController.updateDescriptionUserUser); //controller

//update user status route
route.put('/user/user/update/status', //route
[mid.userMiddleware, mid.authMiddlweware.isActiveUser, upload.array()], //middleware
userApiUserController.updateStatusUserUser); //controller

//logout user route
route.delete('/user/user/logout', //route
[mid.userMiddleware],  //middleware
userApiUserController.logoutUserUser); //controller

module.exports = route;