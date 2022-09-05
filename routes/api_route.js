const userApiUserRoute = require('./api/user/user_api_user_route');
const portfolioApiUserRoute = require('./api/user/portfolio_api_user_route');

module.exports = function(app,url) {
    app.use(url, userApiUserRoute);
    app.use(url, portfolioApiUserRoute);
}