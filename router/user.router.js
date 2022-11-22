const router = require('express').Router();

const controller = require("../controller/user.controller");
const middleware = require("../middleware/user.middleware");

router.get('/', controller.getAllUsers);

router.post('/', middleware.isBodyValidCreate, controller.create);

router.put('/:userId', middleware.isIdValid, middleware.isBodyValidUpdate, middleware.checkIsUserExist, controller.updateUser);

router.delete('/:userId', middleware.isIdValid, middleware.checkIsUserExist, controller.deleteUser);

router.get('/:userId', middleware.isIdValid, middleware.checkIsUserExist, controller.getUserById);

module.exports = router;
