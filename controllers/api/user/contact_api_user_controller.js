//import helpers
const { response, responsePagination } = require('../../../helpers/response_formatter');
const { pagination } = require('../../../helpers/pagination');

//import model
const { Contact, User } = require('../../../models');

//import config
const baseConfig = require('../../../config/base_config');

//for validation
const Validator = require("fastest-validator");
const v = new Validator();

module.exports = {

    //create contact self user
    createContactSelfUser: async (req, res) => {
        try{
            //create schema
            const schema = {
                name_contact: {
                    type: "string",
                    min: 3,
                },
                link_contact:{
                    type: "string",
                    min: 3,
                }
            }

            //create obj
            let contactCreateObj = {
                users_id: data.id,
                name_contact: req.body.name_contact,
                description_contact: req.body.description_contact,
                link_contact: req.body.link_contact,
            }

            //validation
            let validate = v.validate(contactCreateObj, schema);
            if(validate.length > 0){
                res.status(400).json(response(400,'validation failed', validate));
                return;
            }

            //create contact
            let contactCreate = await Contact.create(contactCreateObj);
            
            //send response
            res.status(201).json(response(201,'success create contact', contactCreate));

        }catch(err){
            res.status(500).json(response(500,'internal server error',err));
            console.log(err);
        }
    },

    //get contact self user
    getContactSelfUser: async (req, res) => {
        try{

            let { limit, offset } = pagination(req.body.page - 1, req.body.size);

            //get job user
            let contactGets = await Contact.findAndCountAll({
                limit,
                offset,
                where: {
                    users_id: data.id,
                },
                include:{
                    model: User,
                }
            });

            let totalPages = Math.floor(contactGets.count / limit);
            let currentPage = req.body.page ? +req.body.page : 0;

            //send response
            res.status(200).json(responsePagination(200,'success get contact user', contactGets, totalPages, currentPage));
        }catch(err){
            res.status(500).json(response(500,'internal server error',err));
            console.log(err);
        }
    },

    //get contact self by id user
    getContactSelfByIdUser: async (req, res) => {
        try{
                
            //get contact user
            let contactGet = await Contact.findOne({
                where: {
                    id: req.body.id,
                    users_id: data.id,
                },
                include:{
                    model: User,
                }
            });

            //check if contact not found
            if(!contactGet){
                res.status(404).json(response(404,'contact not found'));
                return;
            }

            //send response
            res.status(200).json(response(200,'success get contact user', contactGet));

        }catch(err){
            res.status(500).json(response(500,'internal server error',err));
            console.log(err);
        }
    },

    //update contact self user
    updateContactSelfUser: async (req, res) => {
        try {

            //get data contact
            let contactCheck = await Contact.findOne({
                where: {
                    id: req.body.id,
                }
            });

            //check if job not found
            if(!contactCheck){
                res.status(404).json(response(404,'contact not found'));
                return;
            }

            //check if user is not owner
            if(contactCheck.users_id != data.id){
                res.status(403).json(response(403,'unauthorized, you are not owner of this contact'));
                return;
            }

            //create schema
            const schema = {
                name_contact: {
                    type: "string",
                    min: 3,
                },
                link_contact:{
                    type: "string",
                    min: 3,
                }
            }

            //create obj
            let contactUpdateObj = {
                users_id: data.id,
                name_contact: req.body.name_contact,
                description_contact: req.body.description_contact,
                link_contact: req.body.link_contact,
            }

            //validation
            let validate = v.validate(contactUpdateObj, schema);
            if(validate.length > 0){
                res.status(400).json(response(400,'validation failed', validate));
                return;
            }

            //update contact
            await Contact.update(contactUpdateObj, {
                where: {
                    id: req.body.id,
                    users_id: data.id,
                }
            });

            //get contact after update
            let contacAfterUpdate = await Contact.findOne({
                where: {
                    id: req.body.id,
                    users_id: data.id,
                }
            });

            //send response
            res.status(200).json(response(200,'success update contact', contacAfterUpdate));
            
        } catch (err) {
            res.status(500).json(response(500,'internal server error',err));
            console.log(err);
        }
    },

    //delete contact self user
    deleteContactSelfUser: async (req, res) => {
        try{
            //get data contact
            let contactCheck = await Contact.findOne({
                where: {
                    id: req.body.id,
                }
            });

            //check if contact not found
            if(!contactCheck){
                res.status(404).json(response(404,'contact not found'));
                return;
            }

            //check if user is not owner
            if(contactCheck.users_id != data.id){
                res.status(403).json(response(403,'unauthorized, you are not owner of this contact'));
                return;
            }

            //delete contact
            await Contact.destroy({
                where: {
                    id: req.body.id,
                    users_id: data.id,
                }
            });

            //send response
            res.status(200).json(response(200,'success delete contact'));
        }catch(err){
            res.status(500).json(response(500,'internal server error',err));
            console.log(err);
        }
    }
}