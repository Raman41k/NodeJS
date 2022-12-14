const router = require('express').Router();

const controller = require("../controller/user.controller");
const middleware = require("../middleware/user.middleware");
const authMiddleware = require("../middleware/auth.middleware");

router.get(
    '/',
    controller.getAllUsers
);
router.post(
    '/',
    middleware.isNewUserValid,
    middleware.checkIsEmailUnique,
    controller.createUser
);

router.get(
    '/:userId',
    middleware.isUserIdValid,
    // authMiddleware.checkAccessToken,
    middleware.getUserDynamically('userId', 'params', '_id'),
    controller.getUserById
);
router.put(
    '/:userId',
    middleware.isUserIdValid,
    middleware.isEditUserValid,
    authMiddleware.checkAccessToken,
    middleware.getUserDynamically('userId', 'params', '_id'),
    controller.updateUser
);
router.delete(
    '/:userId',
    middleware.isUserIdValid,
    authMiddleware.checkAccessToken,
    controller.deleteUserById
);

module.exports = router;
