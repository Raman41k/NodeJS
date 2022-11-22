const router = require('express').Router();

const controller = require("../controller/user.controller");
const middleware = require("../middleware/user.middleware");

router.get('/', controller.getAllUsers);

router.post('/', middleware.checkIsUserExist ,controller.getAllUsers);

// router.post('/', (req, res) => {
//     const userInfo = req.body;
//
//     userDb.push(userInfo);
//
//     res.status(201).json('Created');
// });

router.put('/:userId', middleware.checkIsUserExist, controller.updateUser);

router.get('/:userId', middleware.checkIsUserExist, controller.getUserById);

module.exports = router;
