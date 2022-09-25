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
userApiUserController.getProfileUserSelfUser); //controller

//get user all route
route.get('/user/user/get/all', //route
[mid.userMiddleware, mid.authMiddlweware.isActiveUser, upload.array()], //middleware
userApiUserController.getProfileAllUserUser); //controller

//get user all by id route
route.get('/user/user/get/all/id', //route
[mid.userMiddleware, mid.authMiddlweware.isActiveUser, upload.array()], //middleware
userApiUserController.getProfileByIdUserUser); //controller

//update user self photo route
route.put('/user/user/update/self/photo', //route
[mid.userMiddleware ,mid.authMiddlweware.isActiveUser, upload.single('image_name_user')], //middleware
userApiUserController.uploadPhotoUserSelfUser); //controller

//update user self description route
route.put('/user/user/update/self/description', //route
[mid.userMiddleware, mid.authMiddlweware.isActiveUser, upload.array()], //middleware
userApiUserController.updateDescriptionUserSelfUser); //controller

//update user self status route
route.put('/user/user/update/self/status', //route
[mid.userMiddleware, mid.authMiddlweware.isActiveUser, upload.array()], //middleware
userApiUserController.updateStatusUserSelfUser); //controller

//logout user self route
route.delete('/user/user/logout/self', //route
[mid.userMiddleware],  //middleware
userApiUserController.logoutUserSelfUser); //controller

module.exports = route;