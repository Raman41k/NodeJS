const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const ApiError = require("../error/api.error");

module.exports = {
    hashPassword: (password) => bcrypt.hash(password, 10),

    comparePasswords: async (hashPassword, password) => {
        const isPasswordsSame = await bcrypt.compare(password, hashPassword);

        if (!isPasswordsSame) {
            throw new ApiError('Wrong email or password', 400);
        }
    },

    generateAccessTokenPair: (dataToSign = {}) => {
        const accessToken = jwt.sign(dataToSign, process.env.SECRETWORLD, {expiresIn: '15m'});
        const refreshToken = jwt.sign(dataToSign, process.env.SECRETREFRESHWORLD, {expiresIn: '30d'});

        return {
            accessToken,
            refreshToken
        }
    }
};
