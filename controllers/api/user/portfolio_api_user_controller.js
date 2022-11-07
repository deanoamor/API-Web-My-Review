//import helpers
const { response, responsePagination } = require('../../../helpers/response_formatter');
const { pagination } = require('../../../helpers/pagination');

//import model
const { Portfolio, User } = require('../../../models');

//import config
const baseConfig = require('../../../config/base_config');

//for validation
const Validator = require("fastest-validator");
const v = new Validator();

module.exports = {

    //create portfolio self 
    createPortfolioSelfUser: async (req, res) => {
        try{

            //create schema
            const schema = {
                name_portfolio: { 
                    type: "string", 
                    min: 3, 
                    max: 255 
                },
                link_portfolio: {
                    type: "string",
                    min: 3,
                },
            }

            //create obj
            let portfolioCreateObj = {
                users_id: data.id,
                name_portfolio: req.body.name_portfolio,
                description_portfolio: req.body.description_portfolio,
                link_portfolio: req.body.link_portfolio,
            }

            //validate
            let validate = v.validate(portfolioCreateObj, schema);
            if(validate.length > 0){
                res.status(400).json(response(400,'validation failed', validate));
                return;
            }

            //create portfolio
            let portfolioCreate = await Portfolio.create(portfolioCreateObj);

            //send response
            res.status(201).json(response(201,'success create portfolio', portfolioCreate));

        }catch(err){
            res.status(500).json(response(500,'internal server error',err));
            console.log(err);
        }
    },

    //get portfolio self 
    getPortfolioSelfUser: async (req, res) => {
        try{
            let { limit, offset } = pagination(req.body.page - 1, req.body.size);

            let portfolioGets = await Portfolio.findAndCountAll({
                limit,
                offset,
                where: {
                    users_id: data.id
                },
                include:{
                    model: User,
                }
            });

            let totalpages = Math.floor(portfolioGets.count / limit);
            let currentPage = req.body.page ? +req.body.page : 0;

            //send response
            res.status(200).json(responsePagination(200,'success get portfolio', portfolioGets, totalpages, currentPage));
        }catch(err){
            res.status(500).json(response(500,'internal server error',err));
            console.log(err);
        }
    },

    //get portfolio self by id 
    getPortfolioSelfByIdUser: async (req, res) => {
        try{
            //get portfolio by id
            let portfolioGet = await Portfolio.findOne({
                where: {
                    id: req.body.id,
                    users_id: data.id
                },
                include:{
                    model: User,
                }
            });

            if(!portfolioGet){
                res.status(404).json(response(404,'portfolio not found'));
                return;
            }

            //send response
            res.status(200).json(response(200,'success get portfolio by id', portfolioGet));
        }catch(err){
            res.status(500).json(response(500,'internal server error',err));
            console.log(err);
        }
    },

    //update portfolio self 
    updatePortfolioSelfUser: async (req, res) => {
        try{

            //get portfolio
            let portfolioCheck= await Portfolio.findOne({
                where: {
                    id: req.body.id,
                }
            });

            //check if portfolio not found
            if(!portfolioCheck){
                res.status(404).json(response(404,'portfolio not found'));
                return;
            }

            //check if user is not owner
            if(portfolioCheck.users_id != data.id){
                res.status(403).json(response(403,'unauthorized, you are not owner of this portfolio'));
                return;
            }

            //create schema
            const schema = {
                name_portfolio: { 
                    type: "string", 
                    min: 3, 
                    max: 255 
                },
                link_portfolio: {
                    type: "string",
                    min: 3,
                },
            }

            //create obj
            let portfolioUpdateObj = {
                name_portfolio: req.body.name_portfolio,
                description_portfolio: req.body.description_portfolio,
                link_portfolio: req.body.link_portfolio,
            }

            //validate
            let validate = v.validate(portfolioUpdateObj, schema);
            if(validate.length > 0){
                res.status(400).json(response(400,'validation failed', validate));
                return;
            }

            //update portfolio
            await Portfolio.update(portfolioUpdateObj, {
                where: {
                    id: req.body.id,
                    users_id: data.id
                }
            });

            //get portfolio after update
            let portfolioAfterUpdate = await Portfolio.findOne({
                where: {
                    id: req.body.id,
                    users_id: data.id
                }
            });

            //send response
            res.status(200).json(response(200,'success update portfolio', portfolioAfterUpdate));
        }catch(err){
            res.status(500).json(response(500,'internal server error',err));
            console.log(err);
        }
    },

    //delete portfolio self 
    deletePortfolioSelfUser: async (req, res) => {
        try{

            
            let portfolioCheck = await Portfolio.findOne({
                where: {
                    id: req.body.id,
                }
            });

            //check if portfolio not found
            if(!portfolioCheck){
                res.status(404).json(response(404,'portfolio not found'));
                return;
            }

            //check if user is not owner
            if(portfolioCheck.users_id != data.id){
                res.status(403).json(response(403,'unauthorized, you are not owner of this portfolio'));
                return;
            }
            
            //delete portfolio
            await Portfolio.destroy({
                where: {
                    id: req.body.id,
                    users_id: data.id
                }
            });

            //send response
            res.status(200).json(response(200,'success delete portfolio'));
        }catch(err){
            res.status(500).json(response(500,'internal server error',err));
            console.log(err);
        }
    }
}

