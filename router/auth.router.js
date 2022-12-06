const router = require('express').Router();

const controller = require('../controller/auth.controller');
const middleware = require('../middleware/auth.middleware');
const userMiddleware = require('../middleware/user.middleware');

router.post(
    '/login',
    middleware.isBodyValid,
    userMiddleware.getUserDynamically('email'),
    controller.login
);

router.post(
    '/refresh',
    middleware.checkRefreshToken,
    controller.refresh
);

router.post(
    '/password/forgot',
    userMiddleware.getUserDynamically('email'),
    controller.forgotPassword
);

router.put(
    '/password/forgot',
    controller.forgotPasswordAfterForgot
);

router.post(
    '/logout',
    middleware.checkAccessToken,
    controller.logout
);

router.post(
    '/logoutAll',
    middleware.checkAccessToken,
    controller.logoutAll
);

module.exports = router;
