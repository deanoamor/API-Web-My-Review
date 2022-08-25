//import config
const baseConfig = require('../config/base_config');

//response formatter
const { response } = require('../helpers/response_formatter');

//import model
const { Token } = require('../models');
const { User } = require('../models');

//import jwt token
const jwt = require('jsonwebtoken');


module.exports = {
    isLogin : async (req, res, next) => {
        let token;
        try{
            token = req.headers.authorization.split(' ')[1];
        }catch(err){
            res.status(403).send(response(403,'unauthorized, theres something wrong with your token / settings'));
            return;
        }

        if(!token){
            res.status(403).send(response(403,'unauthorized, token not found'));
            return;
        }

        jwt.verify(token, baseConfig.auth_secret, (err, decoded) => {
            if(err){
                res.status(403).send(response(403,'unauthorized'));
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

        if(!tokenCheck){
            res.status(403).send(response(403,'unauthorized , you should login first'));
            return;
        }else{
            next();
        }
        
    },

    isAdmin: async (req, res, next) => {
        let admin = await Admin.findOne({
            where:{
                id: data.id,
                role: 'Admin'
            }
        });

        if(!admin && data.role !== 'Admin'){
            res.status(403).send(response(403,'unauthorized , youre not an admin'));
            return;
        }else{
            next();
        }
    },

    isUser: async (req, res, next) => {

        if(data.role_user !== 'User'){
            res.status(403).send(response(403,'unauthorized , youre not an user'));
            return;
        }else{
            next();
        }
    }
}