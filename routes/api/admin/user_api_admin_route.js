//import controller
const userApiAdminController = require('../../../controllers/api/admin/user_api_admin_controller');

//middleware
const mid = require('../../../middlewares/main_middleware');

//express
const express = require('express');
const route = express.Router();

//import multer for handle parsing data from form data
const multer = require('multer');
const upload = multer();

//admin and superadmin route
//get other user by admin and superadmin route
route.get('/admin/user/get/other', //route
[mid.adminSuperAdminMiddleware, upload.array()], //middleware
userApiAdminController.getUserOtherAdmin); //controller

//update status other user by admin and superadmin from not active to active route
route.put('/admin/user/update/other/status', //route
[mid.adminSuperAdminMiddleware, upload.array()], //middleware
userApiAdminController.updateStatusUserOtherAdmin); //controller

module.exports = route;