//import controller
const adminApiAdminController = require('../../../controllers/api/admin/admin_api_admin_controller');

//middleware
const mid = require('../../../middlewares/main_middleware');

//express
const express = require('express');
const route = express.Router();

//import multer for handle parsing data from form data
const multer = require('multer');
const upload = multer();

//superadmin route
//create other admin by superadmin route
route.post('/admin/admin/create/other', //route
[mid.superAdminMiddleware, upload.array()], //middleware
adminApiAdminController.createAdminOtherAdmin); //controller

//update status other admin by superadmin from not active to active route
route.put('/admin/admin/update/other/status', //route
[mid.superAdminMiddleware, upload.array()], //middleware
adminApiAdminController.updateStatusAdminOtherAdmin); //controller

//get other admin for superadmin route
route.get('/admin/admin/get/other', //route
[mid.superAdminMiddleware, upload.array()], //middleware
adminApiAdminController.getAdminOtherAdmin); //controller

//====================================================================================================

//admin and superadmin route
//login admin and superadmin route
route.post('/admin/admin/login/self', //route
upload.array(), //middleware
adminApiAdminController.loginAdminSelfAdmin); //controller

//get self admin and superadmin route
route.get('/admin/admin/get/self', //route
[mid.adminSuperAdminMiddleware, upload.array()], //middleware
adminApiAdminController.getAdminSelfAdmin); //controller

//update status self admin to not active  route
route.put('/admin/admin/update/self/status', //route
[mid.adminSuperAdminMiddleware], //middleware
adminApiAdminController.updateStatusAdminSelfAdmin); //controller

//logout self admin and superadmin route
route.delete('/admin/admin/logout/self', //route
[mid.adminSuperAdminMiddleware, upload.array()], //middleware
adminApiAdminController.logoutAdminSelfAdmin); //controller

module.exports = route;