//import helpers
const { response, responsePagination } = require('../../../helpers/response_formatter');
const { pagination } = require('../../../helpers/pagination');

//import model
const { Skill, User } = require('../../../models');

//import config
const baseConfig = require('../../../config/base_config');

//for validation
const Validator = require("fastest-validator");
const v = new Validator();

module.exports = {

    //create skill self 
    createSkillSelfUser: async (req, res) => {
        try{
            //crate schema
            const schema = {
                name_skill: {
                    type: "string",
                    min: 1,
                }
            }

            //create obj
            let skillCreateObj = {
                users_id: data.id,
                name_skill: req.body.name_skill,
                description_skill: req.body.description_skill,
            }

            //validation
            let validate = v.validate(skillCreateObj, schema);
            if(validate.length > 0){
                res.status(400).json(response(400,'validation failed', validate));
                return;
            }

            //create skill
            let skillCreate = await Skill.create(skillCreateObj);

            //send response
            res.status(201).json(response(201,'success create skill', skillCreate));

        }catch(err){
            res.status(500).json(response(500,'internal server error',err));
            console.log(err);
        }
    },

    //get skill self 
    getSkillSelfUser: async (req, res) => {
        try{
            let { limit, offset } = pagination(req.body.page - 1, req.body.size);

            //get skill
            let skillGets = await Skill.findAndCountAll({
                limit,
                offset,
                where: {
                    users_id: data.id,
                },
                include: {
                    model: User,
                }
            });

            let totalpages = Math.floor(skillGets.count / limit);
            let currentPage = req.body.page ? +req.body.page : 0;

            //send response
            res.status(200).json(responsePagination(200,'success get skill', skillGets, totalpages, currentPage));

        }catch(err){
            res.status(500).json(response(500,'internal server error',err));
            console.log(err);
        }
    },

    //get skill self by id 
    getSkillSelfByIdUser: async (req, res) => {
        try{
            //get skill
            let skillGet = await Skill.findOne({
                where: {
                    id: req.body.id,
                    users_id: data.id,
                },
                include: {
                    model: User,
                }
            });

            //check if skill not found
            if(!skillGet){
                res.status(404).json(response(404,'skill not found'));
                return;
            }

            //send response
            res.status(200).json(response(200,'success get skill by id', skillGet));

        }catch(err){
            res.status(500).json(response(500,'internal server error',err));
            console.log(err);
        }
    },

    //update skill self 
    updateSkillSellUser: async (req, res) => {
        try{
            //get skill
            let skillCheck = await Skill.findOne({
                where: {
                    id: req.body.id,
                },
            });

            //check if skill not found
            if(!skillCheck){
                res.status(404).json(response(404,'skill not found'));
                return;
            }

            //check if user is not owner
            if(skillCheck.users_id != data.id){
                res.status(403).json(response(403,'unauthorized, you are not owner of this skill'));
                return;
            }

            //create schema
            const schema = {
                name_skill: {
                    type: "string",
                    min: 1,
                }
            }

            //create obj
            let skillUpdateObj = {
                name_skill: req.body.name_skill,
                description_skill: req.body.description_skill,
            }

            //validation
            let validate = v.validate(skillUpdateObj, schema);
            if(validate.length > 0){
                res.status(400).json(response(400,'validation failed', validate));
                return;
            }

            //update skill
            await Skill.update(skillUpdateObj, {
                where: {
                    id: req.body.id,
                    users_id: data.id,
                }
            });

            //get skill after update
            let skillAfterUpdate = await Skill.findOne({
                where: {
                    id: req.body.id,
                    users_id: data.id,
                },
            });

            //send response
            res.status(200).json(response(200,'success update skill', skillAfterUpdate));

        }catch(err){
            res.status(500).json(response(500,'internal server error',err));
            console.log(err);
        }
    },

    //delete skill self 
    deleteSkillSelfUser: async (req, res) => {
        try{
             //get skill
            let skillCheck = await Skill.findOne({
                where: {
                    id: req.body.id,
                },
            });

            //check if skill not found
            if(!skillCheck){
                res.status(404).json(response(404,'skill not found'));
                return;
            }

            //check if user is not owner
            if(skillCheck.users_id != data.id){
                res.status(403).json(response(403,'unauthorized, you are not owner of this skill'));
                return;
            }

            //delete skill
            await Skill.destroy({
                where: {
                    id: req.body.id,
                    users_id: data.id,
                }
            });

            //send response
            res.status(200).json(response(200,'success delete skill'));

        }catch(err){
            res.status(500).json(response(500,'internal server error',err));
            console.log(err);
        }
    }

}