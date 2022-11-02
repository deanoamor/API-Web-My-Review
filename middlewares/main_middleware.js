const routeMiddleware = require('./route_middleware');
const authMiddlweware = require('./auth_middleware');

//main middleware for user
const userMiddleware = [authMiddlweware.isLogin ,authMiddlweware.isTokenExists, authMiddlweware.isUser, authMiddlweware.isActiveUser];

//main middleware for admin and superadmin
const adminSuperAdminMiddleware = [authMiddlweware.isLogin ,authMiddlweware.isTokenExists, authMiddlweware.isAdminSuperAdmin, authMiddlweware.isActiveAdmin];

//main middleware for superadmin
const superAdminMiddleware = [authMiddlweware.isLogin ,authMiddlweware.isTokenExists, authMiddlweware.isSuperAdmin];

module.exports = {
    routeMiddleware,
    authMiddlweware,
    userMiddleware,
    adminSuperAdminMiddleware,
    superAdminMiddleware
}