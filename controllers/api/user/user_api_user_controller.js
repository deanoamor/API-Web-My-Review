//import helpers
const { response, responsePagination } = require('../../../helpers/response_formatter');
const { pagination } = require('../../../helpers/pagination');

//import models
const {User, Token, Portfolio, Job, Contact, Skill, Review} = require('../../../models');

//import config
const baseConfig = require('../../../config/base_config');

//for validation
const Validator = require("fastest-validator");
const v = new Validator();

//hash password
const passwordHash = require('password-hash');

//jwt
const jwt = require('jsonwebtoken');

//fs
const fs = require('fs');

//email
const { sendEmail } = require('../../../emails/send_email');



module.exports = {

    //register user and send email verification
    registerUserUser: async (req, res) => {
        try{
            //create shema for validation
            const schema = {
                username: {
                    type: 'string',
                    min: 3,
                    max: 30,
                },
                email: {
                    type: 'email',
                    min: 3,
                },
                password: {
                    type: 'string',
                    min: 6,
                },
                gender:{
                    type: 'string',
                    min: 3,
                }
            }

            //validation
            let validate = v.validate({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                gender: req.body.gender
            }, schema);
            if(validate.length > 0){
                res.status(500).send(response(500,'validation failed', validate));
                return;
            }

            //check if email exist
            let userEmail = await User.findOne({
                where:{
                    email: req.body.email
                }
            });
            if(userEmail){
                res.status(500).send(response(500,'email already exist'));
                return;
            }

            //check if username exist
            let userName = await User.findOne({
                where:{
                    username: req.body.username
                }
            });
            if(userName){   
                res.status(500).send(response(500,'username already exist'));
                return;
            }

            //create obj for register
            let userRegisterObj = {
                username: req.body.username,
                email: req.body.email,
                password: passwordHash.generate(req.body.password),
                gender: req.body.gender,
                role_user: 'User',
                status_user: 'Active',
                is_verified: false,
                verified_count: 0,
                star_user: 0,
            }

            //insert user
            let userRegister = await User.create(userRegisterObj);


            if(userRegister){
                //create data to parsing to email
                let emailData = {
                    email: userRegister.email,
                    is_verified: userRegister.is_verified,
                }

                //send email
                sendEmail(userRegister.email,'Verify your email','verified_user_email_email', emailData); //sendEmail(email destination,subject email,html file,data)
            }
            
            res.status(200).send(response(200,'success', userRegister));

        }catch(err){
            res.status(500).send(response(500,'internal server error',err));
            console.log(err);
        }
    },

    //login user
    loginUserUser: async (req, res) => {
        try{
            //create shema for validation
            const schema = {
                email: {
                    type: 'email',
                    min: 3,
                },
                password: {
                    type: 'string',
                    min: 6,
                }
            }
            
            let email = req.body.email;
            let password = req.body.password;

            //validation
            let validate = v.validate({
                email: email,
                password: password
            }, schema);

            if(validate.length > 0){
                res.status(500).send(response(500,'validation failed', validate));
                return;
            }

            //get user email
            let userEmail = await User.findOne({
                where:{
                    email: req.body.email
                }
            });

            //check if email not exist
            if(!userEmail){
                res.status(500).send(response(500,'email not found'));
                return;
            }

            //check user verified
            if(userEmail.is_verified == false){
                res.status(500).send(response(500,'email not verified'));
                return;
            }

            //check if account not user
            if(userEmail.role_user != 'User'){
                res.status(500).send(response(500,'account not user'));
                return;
            }

            //check password
            if(!passwordHash.verify(password, userEmail.password)){
                res.status(500).send(response(500,'password not match'));
                return;
            }
            
            //create token
            let token = jwt.sign({
                id: userEmail.id,
                role_user: userEmail.role_user,
            }, baseConfig.auth_secret, {
                expiresIn: 86400 // expires in 24 hours
            });
            

            res.status(200).send(response(200,'Login success', token));
        }catch(err){
            res.status(500).send(response(500,'internal server error',err));
            console.log(err);
        }
    },

    //get user self profile
    getProfileUserSelfUser: async (req, res) => {
        try{
            //find user
            let userGet = await User.findOne({
                where:{
                    id: data.id
                },
                include: [{
                    model: Portfolio,
                },
                {
                    model: Job,
                },
                {
                    model: Contact,
                },
                {
                    model: Skill,
                },
                {
                    model: Review,
                }]
            });
            res.status(200).send(response(200,'success', userGet));
        }catch(err){
            res.status(500).send(response(500,'internal server error',err));
            console.log(err);
        }
    },

    //get user profile all 
    getProfileAllUserUser: async (req, res) => {
        try{
            let { limit, offset } = pagination(req.body.page - 1, req.body.size);
            //find all user
            let userGets = await User.findAndCountAll({
                limit,
                offset,
                include: [{
                    model: Portfolio,
                },
                {
                    model: Job,
                },
                {
                    model: Contact,
                },
                {
                    model: Skill,
                },
                {
                    model: Review,
                }]
            });

            let totalPages = Math.floor(userGets.count / limit);
            let currentPage = req.body.page ? +req.body.page : 0;

            res.status(200).send(responsePagination(200,'success get all data', userGets, totalPages, currentPage));
        }catch(err){
            res.status(500).send(response(500,'internal server error',err));
            console.log(err);
        }
    },

    //get user profile by id
    getProfileByIdUserUser: async (req, res) => {
        try{
            let id = req.body.id;

            //find user by id
            let userGet = await User.findOne({
                where:{
                    id: id
                },
                include: [{
                    model: Portfolio,
                },
                {
                    model: Job,
                },
                {
                    model: Contact,
                },
                {
                    model: Skill,
                },
                {
                    model: Review,
                }]
            });

            if(!userGet){
                res.status(500).send(response(500,'user not found'));
                return;
            }

            res.status(200).send(response(200,'success get by id', userGet));
        }catch(err){
            res.status(500).send(response(500,'internal server error',err));
            console.log(err);
        }
    },

    //upload user self photo
    uploadPhotoUserSelfUser: async (req, res) => {
        try{
            //check format
            if(req.file.mimetype != 'image/jpeg' && req.file.mimetype != 'image/png'){
                res.status(500).send(response(500,'format not supported'));
                return
            }

            //check file size
            if(req.file.size > 1000000){
                res.status(500).send(response(500,'file size too big'));
                return
            }

            let fileName = data.id + "-" + req.file.originalname;

            //get oldest filename
            let oldestFileName = await User.findOne({
                where: {
                    id: data.id
                }
            });

            //check if user doesnt update
            if(fileName == oldestFileName.image_name_user){
                res.status(500).send(response(500,'image not updated'));
                return
            }

            //delete old photo if exist
            if(fs.existsSync(`./public/image/user/${oldestFileName.image_name_user}`)){
                fs.unlinkSync(`./public/image/user/${oldestFileName.image_name_user}`);
            }

            //insert file to public folder
            fs.writeFileSync(`public/image/user/${fileName}`, req.file.buffer, (err) => {
                if(err){
                    res.status(500).send(response(500,'internal server error',err));
                    return
                }
            }); 

            //update user photo
            await User.update({
                image_name_user: fileName,
                image_path_user: baseConfig.base_url + '/image/user/' + fileName
            },
            {
                where:{
                    id: data.id
                }
            }); 

            //get data user after update
            let userAfterUpdate = await User.findOne({
                where:{
                    id: data.id
                }
            });
            
            res.status(200).send(response(200,'photo uploaded', userAfterUpdate));

        }catch(err){
            //delete photo if error
            let fileName = data.id + "-" + req.file.originalname;
            if(fs.existsSync(`public/image/user/${fileName}`)){
                fs.unlinkSync(`public/image/user/${fileName}`);
            }
            
            res.status(500).send(response(500,'internal server error',err));
            console.log(err);
        }
    },

    //update user self description
    updateDescriptionUserSelfUser: async (req, res) => {
        try{
            //check description longer than 2000 character
            if(req.body.description_user.length > 2000){
                res.status(500).send(response(500,'description too long'));
                return
            }
            
            //update user description
            await User.update({
                description_user: req.body.description_user
            },
            {
                where:{
                    id: data.id
                }
            }); 

            //get data user after update
            let userAfterUpdate = await User.findOne({
                where:{
                    id: data.id
                }
            });
            
            res.status(200).send(response(200,'description updated', userAfterUpdate));

        }catch(err){
            res.status(500).send(response(500,'internal server error',err));
            console.log(err);
        }
    },

    //update user self status to not active
    updateStatusUserSelfUser: async (req, res) => {
        try{        
            //update user status
            await User.update({
                status_user: 'Not Active'
            },
            {
                where:{
                    id: data.id
                }
            }); 

            //get data user after update
            let userAfterUpdate = await User.findOne({
                where:{
                    id: data.id
                }
            });
            
            res.status(200).send(response(200,'status updated', userAfterUpdate));

        }catch(err){
            res.status(500).send(response(500,'internal server error',err));
            console.log(err);
        }
    },

    //logout user self
    logoutUserSelfUser: async (req, res) => {
        try{
            //delete token
            let token = req.headers.authorization.split(' ')[1];
            //insert token to token table
            let tokenInsert = await Token.create({
                users_id: data.id,
                token: token
            });
            res.status(200).send(response(200,'token deleted', tokenInsert));
        }catch(err){
            res.status(500).send(response(500,'internal server error',err));
            console.log(err);
        }
    }

}