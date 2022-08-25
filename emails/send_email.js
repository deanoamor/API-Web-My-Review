//import config
const baseConfig = require('../config/base_config');

//nodemailer
const nodemailer = require('nodemailer');

//mustache
const mustache = require('mustache');

//fs
const fs = require('fs');

module.exports = {
    sendEmail: (email,subject, html, data) => {

        const template = fs.readFileSync(`./views/template_email/${html}.html`, 'utf8');

        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: baseConfig.email_user,
                pass: baseConfig.email_password
            }
        });

        let optionEmail = {
            from: baseConfig.email_user,
            to: email,
            subject: subject,
            html: mustache.render(template, { ...data})
        };

        transporter.sendMail(optionEmail, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }
}