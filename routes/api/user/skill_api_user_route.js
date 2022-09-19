//import controller
const skillApiUserController = require('../../../controllers/api/user/skill_api_user_controller');

//middleware
const mid = require('../../../middlewares/main_middleware');

//express
const express = require('express');
const route = express.Router();

//import multer for handle parsing data from form data
const multer = require('multer');
const upload = multer();

//create skill self route
route.post('/user/skill/create/self', //route
[mid.userMiddleware, mid.authMiddlweware.isActiveUser, upload.array()], //middleware
skillApiUserController.createSkillSelfUser); //controller

//get skill self route
route.get('/user/skill/get/self', //route
[mid.userMiddleware, mid.authMiddlweware.isActiveUser, upload.array()], //middleware
skillApiUserController.getSkillSelfUser); //controller

//get skill self by id route
route.get('/user/skill/get/self/id', //route
[mid.userMiddleware, mid.authMiddlweware.isActiveUser, upload.array()], //middleware
skillApiUserController.getSkillSelfByIdUser); //controller

//update skill self route
route.put('/user/skill/update/self', //route
[mid.userMiddleware, mid.authMiddlweware.isActiveUser, upload.array()], //middleware
skillApiUserController.updateSkillSellUser); //controller

//delete skill self route
route.delete('/user/skill/delete/self', //route
[mid.userMiddleware, mid.authMiddlweware.isActiveUser, upload.array()], //middleware
skillApiUserController.deleteSkillSelfUser); //controller

module.exports = route;