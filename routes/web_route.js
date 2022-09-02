const userWebUserRoute = require('./web/user/user_web_user_route');

module.exports = function(app,url) {
    app.use(url, userWebUserRoute);
}