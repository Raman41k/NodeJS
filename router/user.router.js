const router = require('express').Router();

const {userController} = require("../controller");
const middleware = require("../middleware/user.middleware");

router.get('/', userController.getAllUsers);
router.post('/', middleware.isBodyValidCreate, middleware.userNormalizator  ,middleware.checkIsEmailUnique, userController.createUser);

router.get('/:userId', middleware.checkIsUserExist, userController.getUserById);
router.put('/:userId', middleware.isBodyValidUpdate, middleware.userNormalizator, middleware.checkIsUserExist, userController.updateUser);
router.delete('/:userId', userController.deleteUserById);

module.exports = router;
