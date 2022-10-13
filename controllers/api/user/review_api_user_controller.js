//import helpers
const { response, responsePagination } = require('../../../helpers/response_formatter');
const { pagination } = require('../../../helpers/pagination');

//import model
const { Review, User, Skill } = require('../../../models');

//import config
const baseConfig = require('../../../config/base_config');

//for validation
const Validator = require("fastest-validator");
const v = new Validator();

module.exports = {
    //create review for other user
    createReviewOtherUser: async (req , res) => {
        try{

            //get data user
            let reviewCheckUserId = await User.findOne({
                where: {
                    id: req.body.users_id
                }
            });

             //check if users_id not found
            if(!reviewCheckUserId){
                res.status(500).json(response(500,'users_id not found'));
                return;
            };

            if(req.body.skills_id){
                
                //get data skill
                let reviewCheckSkillsId = await Skill.findOne({
                    where: {
                        id: req.body.skills_id
                    }
                });

                //check if skills_id not found
                if(!reviewCheckSkillsId){
                    res.status(500).json(response(500,'skills_id not found'));
                    return;
                };

                //check if skills_id owner not same with users_id
                if(reviewCheckSkillsId.users_id != req.body.users_id){
                    res.status(500).json(response(500,'skills_id owner not same with users_id'));
                    return;
                };
            };

            //create schema
            const schema = {
                users_id: { 
                    type: "number", 
                    positive: true, 
                    integer: true 
                },
                description_review: { 
                    type: "string", 
                    min: 3, 
                    max: 500
                },
                star_review: {
                    type: "number",
                    min: 1,
                    max: 5,
                },
            };

            //create obj
            let reviewCreateObj = {
                users_id: parseInt(req.body.users_id),
                my_id: data.id,
                skills_id: req.body.skills_id? parseInt(req.body.skills_id) : null,
                description_review: req.body.description_review,
                status_review: 'PENDING',
                star_review: parseFloat(req.body.star_review),
            };

            //validate
            let validate = v.validate(reviewCreateObj, schema);
            if(validate.length > 0){
                res.status(500).json(response(500,'validation failed', validate));
                return;
            };

            //create review
            let reviewCreate = await Review.create(reviewCreateObj);

            //send response
            res.status(200).json(response(200,'success create review', reviewCreate));

        }catch(err){
            res.status(500).json(response(500,'internal server error',err));
            console.log(err);
        }
    },

    //get review that create by self for other user
    getReviewOtherUser: async (req , res) => {
        try{
            let { limit, offset } = pagination(req.body.page - 1, req.body.size);

            //get data review other user
            let reviewOtherGets = await Review.findAndCountAll({
                limit,
                offset,
                where: {
                    my_id: data.id,
                },
                include:[
                    {
                        model: User,
                    },
                    {
                        model: Skill,
                    }
                ]
            });

            //check if data review 0
            if(reviewOtherGets.count == 0){
                res.status(500).json(response(500,'review not found'));
                return;
            }

            let totalpages = Math.floor(reviewOtherGets.count / limit);
            let currentPage = req.body.page ? +req.body.page : 0;

            //send response
            res.status(200).json(responsePagination(200,'success get review', reviewOtherGets, totalpages, currentPage));

        }catch(err){
            res.status(500).json(response(500,'internal server error',err));
            console.log(err);
        }
    },

    //get review that create by self for other user by id user
    getReviewOtherByIdUser: async (req , res) => {
        try{
            //get data other user review by id
            let reviewOtherGet = await Review.findOne({
                where:{
                    id: req.body.id,
                    my_id: data.id,
                },
                include:[
                    {
                        model: User,
                    },
                    {
                        model: Skill,
                    }
                ]
            });

            //check if review not found
            if(!reviewOtherGet){
                res.status(500).json(response(500,'review not found'));
                return;
            }

            //send response
            res.status(200).json(response(200,'success get review by id', reviewOtherGet));

        }catch(err){
            res.status(500).json(response(500,'internal server error',err));
            console.log(err);
        }
    },

    //get review that create by other user for self user
    getReviewSelfUser: async (req , res) => {
        try{
            let { limit, offset } = pagination(req.body.page - 1, req.body.size);

            //get data review other user
            let reviewSelfGets = await Review.findAndCountAll({
                limit,
                offset,
                where: {
                    users_id: data.id,
                },
                include:[
                    {
                        model: User,
                    },
                    {
                        model: Skill,
                    }
                ]
            });

            //check if data review 0
            if(reviewSelfGets.count == 0){
                res.status(500).json(response(500,'review not found'));
                return;
            }

            let totalpages = Math.floor(reviewSelfGets.count / limit);
            let currentPage = req.body.page ? +req.body.page : 0;

            //send response
            res.status(200).json(responsePagination(200,'success get review', reviewSelfGets, totalpages, currentPage));

        }catch(err){
            res.status(500).json(response(500,'internal server error',err));
            console.log(err);
        }
    },

    //get review that create by other user for self by id user
    getReviewSelfByIdUser: async (req , res) => {
        try{
            //get review data by id
            let reviewSelfGet = await Review.findOne({
                where:{
                    id: req.body.id,
                    users_id: data.id,
                },
                include:[
                    {
                        model: User,
                    },
                    {
                        model: Skill,
                    }
                ]
            });

            //check if review not found
            if(!reviewSelfGet){
                res.status(500).json(response(500,'review not found'));
                return;
            }

            //send response
            res.status(200).json(response(200,'success get review by id', reviewSelfGet));
        }catch(err){
            res.status(500).json(response(500,'internal server error',err));
            console.log(err);
        }
    },

    //update review that create by other user for self user
    updateReviewOtherUser: async (req , res) => {
        try{
            
            //get review
            let reviewCheck = await Review.findOne({
                where: {
                    id: req.body.id,
                },
            });

            //check if review not found
            if(!reviewCheck){
                res.status(404).json(response(404,'review not found'));
                return;
            }

            //check if user is not owner
            if(reviewCheck.my_id != data.id){
                res.status(403).json(response(403,'unauthorized, you are not owner that create this review'));
                return;
            }

            //create schema
            const schema = {
                description_review: { 
                    type: "string", 
                    min: 3, 
                    max: 500
                },
                star_review: {
                    type: "number",
                    min: 1,
                    max: 5,
                },
            };

            //crate obj
            let reviewUpdateObj = {
                description_review: req.body.description_review,
                star_review: parseFloat(req.body.star_review),
            };

            //validate
            let validate = v.validate(reviewUpdateObj, schema);
            if(validate.length > 0){
                res.status(500).json(response(500,'validation failed', validate));
                return;
            }

            //update review
            await Review.update(reviewUpdateObj, {
                where: {
                    id: req.body.id,
                    my_id: data.id,
                }
            });

            //get review after update
            let reviewAfterUpdate = await Review.findOne({
                where: {
                    id: req.body.id,
                    my_id: data.id,
                },
                include:[
                    {
                        model: User,
                    },
                    {
                        model: Skill,
                    }
                ]
            });

            //send response
            res.status(200).json(response(200,'success update review', reviewAfterUpdate));

        }catch(err){
            res.status(500).json(response(500,'internal server error',err));
            console.log(err);
        }
    },

    //update status review that create by other user for self user
    updateStatusReviewSelfUser: async (req , res) => {
        try{
            //get review
            let reviewCheck = await Review.findOne({
                where: {
                    id: req.body.id,
                },
            });

            //check if review not found
            if(!reviewCheck){
                res.status(404).json(response(404,'review not found'));
                return;
            }

            //check if user is not owner
            if(reviewCheck.users_id != data.id){
                res.status(403).json(response(403,'unauthorized, you are not owner that receive this review'));
                return;
            }

             //create schema
            const schema = {
                status_review: {
                    type: "string",
                    enum: ['ACCEPT', 'REJECT'],
                },
            };

            //crate obj
            let reviewStatusUpdateObj = {
                status_review: req.body.status_review,
            };

            //validate
            let validate = v.validate(reviewStatusUpdateObj, schema);
            if(validate.length > 0){
                res.status(500).json(response(500,'validation failed', validate));
                return;
            };

            //update status
            await Review.update(reviewStatusUpdateObj, {
                where: {
                    id: req.body.id,
                }
            });

            //get review after update
            let reviewAfterUpdate = await Review.findOne({
                where: {
                    id: req.body.id,
                    users_id: data.id,
                },
                include:[
                    {
                        model: User,
                    },
                    {
                        model: Skill,
                    }
                ]
            });

            //send response
            res.status(200).json(response(200,'success update status review', reviewAfterUpdate));
        }catch(err){
            res.status(500).json(response(500,'internal server error',err));
            console.log(err);
        }
        
    },

}