//import helpers
const { response, responsePagination } = require('../../../helpers/response_formatter');
const { pagination } = require('../../../helpers/pagination');

//import model
const { Admin, User, Token } = require('../../../models');

//import config
const baseConfig = require('../../../config/base_config');

//hash password
const passwordHash = require('password-hash');

//jwt
const jwt = require('jsonwebtoken');

//for validation
const Validator = require("fastest-validator");
const v = new Validator();

module.exports = {

    //superadmin
    //create admin other
    createAdminOtherAdmin: async (req, res) => {
        try{
            //create schema
            const schema = {
                adminname:{
                    type: "string",
                    min: 3,
                    max: 20,
                },
                email:{
                    type: "email",
                    min: 3,
                },
                password:{
                    type: "string",
                    min: 3,
                },
            }

            //validate
            const validate = v.validate({
                adminname: req.body.adminname,
                email: req.body.email,
                password: req.body.password,
            }, schema);
            if(validate.length > 0){
                res.status(400).json(response(400,'validation failed', validate));
                return;
            }

            //check if email admin already exist
            let adminEmail = await Admin.findOne({
                where: {
                    email: req.body.email,
                }
            });
            if(adminEmail){
                res.status(409).json(response(409,'email admin already exist'));
                return;
            }

            //check if adminname already exist
            let adminName = await Admin.findOne({
                where: {
                    adminname: req.body.adminname,
                }
            });
            if(adminName){
                res.status(409).json(response(409,'adminname already exist'));
                return;
            }

            //create obj
            let adminCreateObj = {
                adminname: req.body.adminname,
                email: req.body.email,
                password: passwordHash.generate(req.body.password),
                role_admin: 'Admin',
                status_admin: 'Active',
            }

            //create admin
            let adminCreate = await Admin.create(adminCreateObj);
            
            //send response
            res.status(201).json(response(201,'success create admin', adminCreate));

        }catch(err){
            res.status(500).json(response(500,'internal server error',err));
            console.log(err);
        }
    },

    //update admin other status from not active to active
    updateStatusAdminOtherAdmin: async (req, res) => {
        try{

            //get admin data
            let adminGet = await Admin.findOne({
                where: {
                    id: req.body.id,
                }
            });
            
            //check if admin not exist
            if(!adminGet){
                res.status(404).json(response(404,'admin not found'));
                return;
            }

            //update other admin to active
            await Admin.update({
                status_admin: 'Active',
            },{
                where: {
                    id: req.body.id,
                }
            })

            //get data admin after update
            let adminAfterUpdate = await Admin.findOne({
                where: {
                    id: req.body.id,
                }
            })

            //send response
            res.status(200).json(response(200,'success update status admin', adminAfterUpdate));
        }catch(err){
            res.status(500).json(response(500,'internal server error',err));
            console.log(err);
        }
    },

    //get admin other 
    getAdminOtherAdmin: async (req, res) => {
        try{
            let { limit, offset } = pagination(req.body.page - 1, req.body.size);

            //find other admin
            let adminGets = await Admin.findAndCountAll({
                limit,
                offset,
            });

            let totalPages = Math.floor(adminGets.count / limit);
            let currentPage = req.body.page ? +req.body.page : 0;

            //send response
            res.status(200).json(responsePagination(200,'success get all data', adminGets, totalPages, currentPage));
        }catch(err){
            res.status(500).json(response(500,'internal server error',err));
            console.log(err);
        }
    },

    //====================================================================================================

    //admin and superadmin
    //login admin self
    loginAdminSelfAdmin: async (req, res) => {
        try{
            //create schema
            const schema = {
                email:{
                    type: "email",
                    min: 3,
                },
                password:{
                    type: "string",
                    min: 3,
                }
            }

            let email = req.body.email;
            let password = req.body.password;

            //validate
            const validate = v.validate({
                email: email,
                password: password,
            }, schema);
            if(validate.length > 0){
                res.status(400).json(response(400,'validation failed', validate));
                return;
            }

            //get admin data
            let adminEmail = await Admin.findOne({
                where:{
                    email: email
                }
            })

            //check if email not exist
            if(!adminEmail){
                res.status(404).json(response(404,'email not found'));
                return;
            }

            //check if account not admin
            if(adminEmail.role_admin == 'User'){
                res.status(403).json(response(403,'you are not admin or super admin'));
                return;
            }

            //check if account not active
            if(adminEmail.status_admin !== 'Active'){
                res.status(403).json(response(403,'account not active'));
                return;
            }

            //check password
            if(!passwordHash.verify(password, adminEmail.password)){
                res.status(403).json(response(403,'password wrong'));
                return;
            }

            //create token
            let token = jwt.sign({
                id: adminEmail.id,
                role_admin: adminEmail.role_admin,
            }, baseConfig.auth_secret, {
                expiresIn: 86400 // expires in 24 hours
            });
            
            //send response
            res.status(200).json(response(200,'Login success', token));
            
        }catch(err){
            res.status(500).json(response(500,'internal server error',err));
            console.log(err);
        }
    },

    //get admin self 
    getAdminSelfAdmin: async (req, res) => {
        try{
            //get admin
            let adminGet = await Admin.findOne({
                where: {
                    id: data.id,
                }
            });

            //send response
            res.status(200).json(response(200,'success get admin self', adminGet));
        }catch(err){
            res.status(500).json(response(500,'internal server error',err));
            console.log(err);
        }
    },

    //update admin self status to not active 
    updateStatusAdminSelfAdmin: async (req, res) => {
        try{        
            //update admin status
            await Admin.update({
                status_admin: 'Not Active'
            },
            {
                where:{
                    id: data.id
                }
            }); 

            //get token
            let token = req.headers.authorization.split(' ')[1];
            
            //insert token to token table
            await Token.create({
                admins_id: data.id,
                token: token
            });

            //get data user after update
            let adminAfterUpdate = await Admin.findOne({
                where:{
                    id: data.id
                }
            });
            
            //send response
            res.status(200).json(response(200,'status updated', adminAfterUpdate));

        }catch(err){
            res.status(500).json(response(500,'internal server error',err));
            console.log(err);
        }
    },

    //logout admin self 
    logoutAdminSelfAdmin: async (req, res) => {
        try{
            //delete token
            let token = req.headers.authorization.split(' ')[1];
            //insert token to token table
            let tokenInsert = await Token.create({
                admins_id: data.id,
                token: token
            });

            //send response
            res.status(200).json(response(200,'token deleted', tokenInsert));
        }catch(err){
            res.status(500).json(response(500,'internal server error',err));
            console.log(err);
        }
    }
}