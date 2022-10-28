//import controller
const reviewApiUserController = require('../../../controllers/api/user/review_api_user_controller');

//middleware
const mid = require('../../../middlewares/main_middleware');

//express
const express = require('express');
const route = express.Router();

//import multer for handle parsing data from form data
const multer = require('multer');
const upload = multer();

 //create review for other user route
route.post('/user/review/create/other', //route
[mid.userMiddleware, upload.array()], //middleware
reviewApiUserController.createReviewOtherUser); //controller

//get review that create by self for other user route
route.get('/user/review/get/other', //route
[mid.userMiddleware, upload.array()], //middleware
reviewApiUserController.getReviewOtherUser); //controller

//get review that create by self for other user by id user route
route.get('/user/review/get/other/id', //route
[mid.userMiddleware, upload.array()], //middleware
reviewApiUserController.getReviewOtherByIdUser); //controller

//get review that create by other user for self user route
route.get('/user/review/get/self', //route
[mid.userMiddleware, upload.array()], //middleware
reviewApiUserController.getReviewSelfUser); //controller

//get review that create by other user for self by id user route
route.get('/user/review/get/self/id', //route
[mid.userMiddleware, upload.array()], //middleware
reviewApiUserController.getReviewSelfByIdUser); //controller

//update review that create by self for other user route
route.put('/user/review/update/other', //route
[mid.userMiddleware, upload.array()], //middleware
reviewApiUserController.updateReviewOtherUser); //controller

//update status review that create by other user for self user
route.put('/user/review/update/status/self', //route
[mid.userMiddleware, upload.array()], //middleware
reviewApiUserController.updateStatusReviewSelfUser); //controller


module.exports = route;
