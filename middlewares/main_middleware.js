const routeMiddleware = require('./route_middleware');
const authMiddlweware = require('./auth_middleware');

const userMiddleware = [authMiddlweware.isLogin ,authMiddlweware.isTokenExists, authMiddlweware.isUser];

module.exports = {
    routeMiddleware,
    authMiddlweware,
    userMiddleware
}