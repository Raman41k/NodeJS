const userDb = require("../dataBase/users.json");
const {fileService} = require("../service");

module.exports = {
    getAllUsers: async (req, res, next) => {
        try {
            const users = await fileService.readDer();

            res.json(users);
        } catch (e) {
            next(e);
        }
    },

    getUserById: (req, res, next) => {
        try {
            res.json(req.user);
        } catch (e) {
            next(e);
        }
    },

    updateUser: (req, res, next) => {
        try {
            const newUserInfo = req.body;
            const {userId} = req.params;

            userDb[userId] = newUserInfo;

            res.json('Updated');
        } catch (e) {
            next(e);
        }
    }
}