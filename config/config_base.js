require('dotenv').config()

module.exports = {
    web_name: process.env.WEB_NAME,
    base_url: process.env.BASE_URL,
    email_user: process.env.EMAIL_USER,
    email_password: process.env.EMAIL_PASSWORD,

    auth_secret: process.env.AUTH_SECRET,
}