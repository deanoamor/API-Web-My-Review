//user
const userApiUserRoute = require('./api/user/user_api_user_route');
const portfolioApiUserRoute = require('./api/user/portfolio_api_user_route');
const jobApiUserRoute = require('./api/user/job_api_user_route');
const contactApiUserRoute = require('./api/user/contact_api_user_route');
const skillApiUserRoute = require('./api/user/skill_api_user_route');
const reviewApiUserRoute = require('./api/user/review_api_user_route');

//admin
const adminApiAdminRoute = require('./api/admin/admin_api_admin_route');
const userApiAdminRoute = require('./api/admin/user_api_admin_route');

module.exports = function(app,url) {
    //user
    app.use(url, userApiUserRoute);
    app.use(url, portfolioApiUserRoute);
    app.use(url, jobApiUserRoute);
    app.use(url, contactApiUserRoute);
    app.use(url, skillApiUserRoute);
    app.use(url, reviewApiUserRoute);

    //admin
    app.use(url, adminApiAdminRoute);
    app.use(url, userApiAdminRoute);

}