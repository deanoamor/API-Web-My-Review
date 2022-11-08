//import helpers
const { response, responsePagination } = require('../../../helpers/response_formatter');
const { pagination } = require('../../../helpers/pagination');

//import model
const { Admin, User, Token , Portfolio, Job, Contact, Skill, Review} = require('../../../models');

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
    
    //get other user by admin and superadmin
    getUserOtherAdmin: async (req, res) => {
        try{
            let { limit, offset } = pagination(req.body.page - 1, req.body.size);

            //find other user
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

            //send response
            res.status(200).json(responsePagination(200,'success get all data', userGets, totalPages, currentPage));
        }catch(err){
            res.status(500).json(response(500,'internal server error',err));
            console.log(err);
        }
    },

    //update status other user by admin and superadmin from not active to active
    updateStatusUserOtherAdmin: async (req, res) => {
        try{
            //get user data
            let userGet = await User.findOne({
                where: {
                    id: req.body.id,
                }
            });
            
            //check if admin not exist
            if(!userGet){
                res.status(404).json(response(404,'user not found'));
                return;
            }

            //check if user already active
            if(userGet.status_user == 'Active'){
                res.status(403).json(response(403,'user already active'));
                return;
            }   

            //update other user to active
            await User.update({
                status_user: 'Active',
            },{
                where: {
                    id: req.body.id,
                }
            })

            //get data user after update
            let userAfterUpdate = await User.findOne({
                where: {
                    id: req.body.id,
                }
            })

            //send response
            res.status(200).json(response(200,'success update status user', userAfterUpdate));
        }catch(err){
            res.status(500).json(response(500,'internal server error',err));
            console.log(err);
        }
    }
}