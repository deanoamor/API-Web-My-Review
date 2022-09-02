const userApiUserRoute = require('./api/user/user_api_user_route');

module.exports = function(app,url) {
    app.use(url, userApiUserRoute);
}