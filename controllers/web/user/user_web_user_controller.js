//import helper
const {response} = require('../../../helpers/response_formatter');

//import models
const {User} = require('../../../models');

//path
const path = require('path');

//mustache
const mustache = require('mustache');

//fs
const fs = require('fs');


module.exports = {

    //render page for verify email
    verfiedEmailPageUserUser: async(req, res) =>{
        try{
            const data = {
                title: 'Verify Email',
                email: req.body.email,
                is_verified: req.body.is_verified
            }

            //get verified_count
            let verifiedCountUser = await User.findOne({
                where: {
                    email: req.body.email
                }
            });

            //check if verified_count is more than 0
            if(verifiedCountUser.verified_count > 0){
                let count = verifiedCountUser.verified_count;

                //update verified_count
                await User.update({
                    verified_count: count + 1
                },{
                    where: {
                        email: req.body.email
                    }
                });
            }
           
            let output = mustache.render(fs.readFileSync(path.join(__dirname, '../../../views/template_email/verified_user_email_page.html'), 'utf8'), {...data});

            res.send(output);

        }catch(err){
            res.send('not allowed')
        }
    },

    //verify email function
    verifiedEmailUserUser: async(req, res) =>{
        try{
            let userEmail = await User.findOne({
                where:{
                    email: req.body.email
                }
            });

            //check if email not found
            if(!userEmail){
                res.status(500).send(response(500,'email not found', null));
                return;
            }

            //check if email is verified
            if(userEmail.is_verified == 1){
                res.status(500).send(response(500,'email already verified', null));
                return;
            }

            //check if verified_count is equal to 0
            if(userEmail.verified_count == 0){
                let count = userEmail.verified_count;

                //update verified_count
                await User.update({
                    verified_count: count + 1
                },{
                    where: {
                        email: req.body.email
                    }
                });
            }

            //change verified status user
            await User.update({
                is_verified: true
            },{
                where:{
                    email: req.body.email
                }
            });

            res.status(200).send(response(200,'email verified'));
            
        }catch(err){
            res.status(500).send(response(500,'error', err));
        }
    },
}