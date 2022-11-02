//import config
const baseConfig = require('../config/base_config');

//response formatter
const { response } = require('../helpers/response_formatter');

//import model
const { Token } = require('../models');
const { User } = require('../models');
const { Admin } = require('../models');

//import jwt token
const jwt = require('jsonwebtoken');


module.exports = {
    isLogin : async (req, res, next) => {
        let token;
        try{
            token = req.headers.authorization.split(' ')[1];
        }catch(err){
            res.status(403).json(response(403,'unauthorized, theres something wrong with your token / settings'));
            return;
        }

        if(!token){
            res.status(403).json(response(403,'unauthorized, token not found'));
            return;
        }

        jwt.verify(token, baseConfig.auth_secret, (err, decoded) => {
            if(err){
                res.status(403).json(response(403,'unauthorized, your token already expired or invalid'));
                return;
            }

            //parsing token with id user
            data = decoded;
            next();
        })

    },

    isTokenExists : async (req, res, next) => {
        let token = req.headers.authorization.split(' ')[1];
        
        let tokenCheck = await Token.findOne({
            where:{
                token: token
            }
        })

        if(tokenCheck){
            res.status(403).json(response(403,'unauthorized , you already logout'));
            return;
        }else{
            next();
        }
        
    },

    isAdminSuperAdmin: async (req, res, next) => {

        if(data.role_admin == 'Admin' || data.role_admin == 'SuperAdmin'){
            next();
        }else{
            res.status(403).json(response(403,'unauthorized , youre not an admin or superadmin'));
            return;
        }
    },

    isSuperAdmin : async (req, res, next) => {
        if(data.role_admin != 'SuperAdmin'){
            res.status(403).json(response(403,'unauthorized , youre not an superadmin'));
            return;
        }else{
            next();
        }
    },

    isUser: async (req, res, next) => {

        if(data.role_user != 'User'){
            res.status(403).json(response(403,'unauthorized , youre not an user'));
            return;
        }else{
            next();
        }
    },

    isActiveUser: async (req, res, next) => {
        let user = await User.findOne({
            where:{
                id: data.id,
                role_user: 'User'
            }
        });

        if(!user){
            res.status(403).json(response(403,'user not found'));
            return;
        }

        if(user.status_user !== 'Active'){
            res.status(403).json(response(403,'user not active'));
            return;
        }

        next();
    },

    isActiveAdmin: async (req, res, next) => {

        if(data.role_admin == 'Admin'){
            let admin = await Admin.findOne({
                where:{
                    id: data.id,
                    role_admin: 'Admin'
                }
            });
    
            if(!admin){
                res.status(403).json(response(403,'admin not found'));
                return;
            }
    
            if(admin.status_admin !== 'Active'){
                res.status(403).json(response(403,'admin not active'));
                return;
            }
        }

        next();
    },
}