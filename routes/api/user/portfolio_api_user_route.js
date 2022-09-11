//import controller
const portfolioApiUserController = require('../../../controllers/api/user/portfolio_api_user_controller');

//middleware
const mid = require('../../../middlewares/main_middleware');

//express
const express = require('express');
const route = express.Router();

//import multer for handle parsing data from form data
const multer = require('multer');
const upload = multer();

//create portfolio self route
route.post('/user/portfolio/create/self', //route
[mid.userMiddleware, mid.authMiddlweware.isActiveUser, upload.array()], //middleware
portfolioApiUserController.createPortfolioSelfUser); //controller

//get portfolio self route
route.get('/user/portfolio/get/self', //route
[mid.userMiddleware, mid.authMiddlweware.isActiveUser, upload.array()], //middleware
portfolioApiUserController.getPortfolioSelfUser); //controller

//get portfolio self by id route
route.get('/user/portfolio/get/self/id', //route
[mid.userMiddleware, mid.authMiddlweware.isActiveUser, upload.array()], //middleware
portfolioApiUserController.getPortfolioSelfByIdUser); //controller

//update portfolio self route
route.put('/user/portfolio/update/self', //route
[mid.userMiddleware, mid.authMiddlweware.isActiveUser, upload.array()], //middleware
portfolioApiUserController.updatePortfolioSelfUser); //controller

//delete portfolio self route
route.delete('/user/portfolio/delete/self', //route
[mid.userMiddleware, mid.authMiddlweware.isActiveUser, upload.array()], //middleware
portfolioApiUserController.deletePortfolioSelfUser); //controller

module.exports = route;