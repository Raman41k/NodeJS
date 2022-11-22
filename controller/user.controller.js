const userDb = require("../dataBase/users");

module.exports = {
    getAllUsers: (req, res, next) => {
        try {
            console.log('Users Endpoint');

            res.json(userDb);
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