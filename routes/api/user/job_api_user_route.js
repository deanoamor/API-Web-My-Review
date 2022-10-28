//import controller
const jobApiUserController = require('../../../controllers/api/user/job_api_user_controller');

//middleware
const mid = require('../../../middlewares/main_middleware');

//express
const express = require('express');
const route = express.Router();

//import multer for handle parsing data from form data
const multer = require('multer');
const upload = multer();

//create job self route
route.post('/user/job/create/self', //route
[mid.userMiddleware, upload.array()], //middleware
jobApiUserController.createJobSelfUser); //controller

//get job self route
route.get('/user/job/get/self', //route
[mid.userMiddleware, upload.array()], //middleware
jobApiUserController.getJobSelfUser); //controller

//get job self by id route
route.get('/user/job/get/self/id', //route
[mid.userMiddleware, upload.array()], //middleware
jobApiUserController.getJobSelfByIdUser); //controller

//update job self route
route.put('/user/job/update/self', //route
[mid.userMiddleware, upload.array()], //middleware
jobApiUserController.updateJobSelfUser); //controller

//delete job self route
route.delete('/user/job/delete/self', //route
[mid.userMiddleware, upload.array()], //middleware
jobApiUserController.deleteJobSelfUser); //controller


module.exports = route;