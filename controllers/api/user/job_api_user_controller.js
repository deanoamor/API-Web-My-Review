//import helpers
const { response, responsePagination } = require('../../../helpers/response_formatter');
const { pagination } = require('../../../helpers/pagination');

//import model
const { Job, User } = require('../../../models');

//import config
const baseConfig = require('../../../config/base_config');

//for validation
const Validator = require("fastest-validator");
const v = new Validator();

module.exports = {

    //create job user
    createJobSelfUser: async (req, res) => {
        try{
            //create schema
            const schema = {
                name_job: {
                    type: "string",
                    min: 3,
                },
                place_job: {
                    type: "string",
                    min: 3,
                },
                position_job: {
                    type: "string",
                    min: 3,
                },
                start_date_job:{
                    type: "string",
                    min: 3,
                },
                end_date_job:{
                    type: "string",
                    min: 3,
                }
            }

            //create obj
            let jobCreateObj = {
                users_id: data.id,
                name_job: req.body.name_job,
                place_job: req.body.place_job,
                description_job: req.body.description_job,
                position_job: req.body.position_job,
                start_date_job: req.body.start_date_job,
                end_date_job: req.body.end_date_job,
            }

            //validate
            let validate = v.validate(jobCreateObj, schema);
            if(validate.length > 0){
                res.status(500).send(response(500,'validation failed', validate));
                return;
            }

            //create job
            let jobCreate = await Job.create(jobCreateObj);

            //send response
            res.status(200).send(response(200,'success create job', jobCreate));
            
        }catch(err){
            res.status(500).send(response(500,'internal server error',err));
            console.log(err);
        }
    },

    //get job self user
    getJobSelfUser: async (req, res) => {
        try{

            let { limit, offset } = pagination(req.body.page - 1, req.body.size);

            //get job user
            let jobGets = await Job.findAndCountAll({
                limit,
                offset,
                where: {
                    users_id: data.id,
                },
                include:{
                    model: User,
                }
            });

            let totalPages = Math.floor(jobGets.count / limit);
            let currentPage = req.body.page ? +req.body.page : 0;

            //send response
            res.status(200).send(responsePagination(200,'success get job user', jobGets, totalPages, currentPage));
        }catch(err){
            res.status(500).send(response(500,'internal server error',err));
            console.log(err);
        }
    },

    //get job self by id user
    getJobSelfByIdUser: async (req, res) => {
        try{
            //get job user
            let jobGet = await Job.findOne({
                where: {
                    id: req.body.id,
                    users_id: data.id,
                },
                include:{
                    model: User,
                }
            });

            //check if job not found
            if(!jobGet){
                res.status(404).send(response(404,'job not found'));
                return;
            }

            //send response
            res.status(200).send(response(200,'success get job user', jobGet));
        }catch(err){
            res.status(500).send(response(500,'internal server error',err));
            console.log(err);
        }
    },

    //update job self user
    updateJobSelfUser: async (req, res) => {
        try{

            //get data job
            let jobCheck = await Job.findOne({
                where: {
                    id: req.body.id,
                }
            });

            //check if job not found
            if(!jobCheck){
                res.status(404).send(response(404,'job not found'));
                return;
            }

            //check if user is not owner
            if(jobCheck.users_id != data.id){
                res.status(403).send(response(403,'unauthorized, you are not owner of this job'));
                return;
            }

             //create schema
             const schema = {
                name_job: {
                    type: "string",
                    min: 3,
                },
                place_job: {
                    type: "string",
                    min: 3,
                },
                position_job: {
                    type: "string",
                    min: 3,
                },
                start_date_job:{
                    type: "string",
                    min: 3,
                },
                end_date_job:{
                    type: "string",
                    min: 3,
                }
            }

            //create obj
            let jobUpdateObj = {
                name_job: req.body.name_job,
                place_job: req.body.place_job,
                description_job: req.body.description_job,
                position_job: req.body.position_job,
                start_date_job: req.body.start_date_job,
                end_date_job: req.body.end_date_job,
            }

            //validate
            let validate = v.validate(jobUpdateObj, schema);
            if(validate.length > 0){
                res.status(500).send(response(500,'validation failed', validate));
                return;
            }

            //update job
            await Job.update(jobUpdateObj, {
                where: {
                    id: req.body.id,
                    users_id: data.id,
                }
            });

            //get job after update
            let jobAfterUpdate = await Job.findOne({
                where: {
                    id: req.body.id,
                    users_id: data.id,
                }
            });

            //send response
            res.status(200).send(response(200,'success update job', jobAfterUpdate));

        }catch(err){
            res.status(500).send(response(500,'internal server error',err));
            console.log(err);
        }
    },

    //delete job self user
    deleteJobSelfUser: async (req, res) => {
        try{
            //get data job
            let jobCheck = await Job.findOne({
                where: {
                    id: req.body.id,
                }
            });

            //check if job not found
            if(!jobCheck){
                res.status(404).send(response(404,'job not found'));
                return;
            }

            //check if user is not owner
            if(jobCheck.users_id != data.id){
                res.status(403).send(response(403,'unauthorized, you are not owner of this job'));
                return;
            }

            //delete job
            await Job.destroy({
                where: {
                    id: req.body.id,
                }
            });

            //send response
            res.status(200).send(response(200,'success delete job'));

        }catch(err){
            res.status(500).send(response(500,'internal server error',err));
            console.log(err);
        }
    }
}