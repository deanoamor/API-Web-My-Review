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

    //create portfolio user
    createPortfoiloUser: async (req, res) => {
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
            const portfolioObj = {
                users_id: data.id,
                name_portfolio: req.body.name_portfolio,
                description_portfolio: req.body.description_portfolio,
                link_portfolio: req.body.link_portfolio,
            }

            //validate
            const validate = v.validate(portfolioObj, schema);
            if(validate.length > 0){
                res.status(500).send(response(500,'validation failed', validate));
                return;
            }

            //create portfolio
            const portfolioCreate = await Portfolio.create(portfolioObj);

            //send response
            res.status(200).send(response(200,'success create portfolio', portfolioCreate));

        }catch(err){
            res.status(500).send(response(500,'internal server error',err));
            console.log(err);
        }
    },

    //get all portfolio user
    getPortfolioUser: async (req, res) => {
        try{
            const { limit, offset } = pagination(req.body.page - 1, req.body.size);

            let portfolio = await Portfolio.findAndCountAll({
                limit,
                offset,
                where: {
                    users_id: data.id
                },
                include:{
                    model: User,
                }
            });

            let totalpages = Math.floor(portfolio.count / limit);
            let currentPage = req.body.page ? +req.body.page : 0;

            res.status(200).send(responsePagination(200,'success get portfolio', portfolio, totalpages, currentPage));
        }catch(err){
            res.status(500).send(response(500,'internal server error',err));
            console.log(err);
        }
    },

    //get portfolio by id user
    getPortfolioByIdUser: async (req, res) => {
        try{
            //get portfolio by id
            const portfolio = await Portfolio.findOne({
                where: {
                    id: req.body.id,
                    users_id: data.id
                },
                include:{
                    model: User,
                }
            });

            if(!portfolio){
                res.status(404).send(response(404,'portfolio not found'));
                return;
            }

            res.status(200).send(response(200,'success get portfolio by id', portfolio));
        }catch(err){
            res.status(500).send(response(500,'internal server error',err));
            console.log(err);
        }
    },

    //update portfolio by id user
    updatePortfolioUser: async (req, res) => {
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
            const portfolioUpdateObj = {
                name_portfolio: req.body.name_portfolio,
                description_portfolio: req.body.description_portfolio,
                link_portfolio: req.body.link_portfolio,
            }

            //validate
            const validate = v.validate(portfolioUpdateObj, schema);
            if(validate.length > 0){
                res.status(500).send(response(500,'validation failed', validate));
                return;
            }

            //check if user is owner
            let portfolioCheckOwner = await Portfolio.findOne({
                where: {
                    id: req.body.id,
                }
            });
            if(portfolioCheckOwner.users_id != data.id){
                res.status(403).send(response(403,'unauthorized, you are not owner of this portfolio'));
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
            const portfolioAfterUpdate = await Portfolio.findOne({
                where: {
                    id: req.body.id,
                    users_id: data.id
                }
            });

            //send response
            res.status(200).send(response(200,'success update portfolio', portfolioAfterUpdate));
        }catch(err){
            res.status(500).send(response(500,'internal server error',err));
            console.log(err);
        }
    },

    //delete portfolio by id user
    deletePortfolioUser: async (req, res) => {
        try{

            //check if user is owner
            let portfolioCheckOwner = await Portfolio.findOne({
                where: {
                    id: req.body.id,
                }
            });
            if(portfolioCheckOwner.users_id != data.id){
                res.status(403).send(response(403,'unauthorized, you are not owner of this portfolio'));
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
            res.status(200).send(response(200,'success delete portfolio'));
        }catch(err){
            res.status(500).send(response(500,'internal server error',err));
            console.log(err);
        }
    }
}

