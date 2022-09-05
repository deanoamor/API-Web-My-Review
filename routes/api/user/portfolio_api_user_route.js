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

//create portfolio route
route.post('/user/portfolio/create', //route
[mid.userMiddleware, mid.authMiddlweware.isActiveUser, upload.array()], //middleware
portfolioApiUserController.createPortfoiloUser); //controller

//get portfolio route
route.get('/user/portfolio/get', //route
[mid.userMiddleware, mid.authMiddlweware.isActiveUser, upload.array()], //middleware
portfolioApiUserController.getPortfolioUser); //controller

//update portfolio route
route.put('/user/portfolio/update', //route
[mid.userMiddleware, mid.authMiddlweware.isActiveUser, upload.array()], //middleware
portfolioApiUserController.updatePortfolioUser); //controller

//delete portfolio route
route.delete('/user/portfolio/delete', //route
[mid.userMiddleware, mid.authMiddlweware.isActiveUser, upload.array()], //middleware
portfolioApiUserController.deletePortfolioUser); //controller

module.exports = route;