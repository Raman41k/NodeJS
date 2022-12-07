const oauthService = require("../service/oauth.service");
const emailService = require("../service/email.service");
const OAuth = require("../dataBase/OAuth");
const ActionToken = require("../dataBase/ActionToken");
const User = require("../dataBase/User");
const {WELCOME, FORGOT_PASS} = require("../config/email.action.enum");
const {FORGOT_PASSWORD} = require("../config/token-action.enum");
const {FRONTEND_URL} = require("../config/config");

module.exports = {
    login: async (req, res, next) => {
        try {
            const {user, body} = req;

            await emailService.sendEmail(user.email, WELCOME, {userName: user.name});

            await oauthService.comparePasswords(user.password, body.password);

            const tokenPair = oauthService.generateAccessTokenPair({id: user._id});

            await OAuth.create({...tokenPair, _user_id: user._id});

            res.json({
                user,
                ...tokenPair
            })
        } catch (e) {
            next(e);
        }
    },

    refresh: async (req, res, next) => {
        try {
            const {refreshToken, _user_id} = req.tokenInfo;

            await OAuth.deleteOne({refreshToken});

            const tokenPair = oauthService.generateAccessTokenPair({id: _user_id});

            await OAuth.create({...tokenPair, _user_id});

            res.status(201).json(tokenPair);
        } catch (e) {
            next(e);
        }
    },

    forgotPassword: async (req, res, next) => {
        try {

            const {_id, email, name} = req.user;

            const actionToken = oauthService.generateActionToken(FORGOT_PASSWORD, {email: email});

            const forgotPassFEUrl = `${FRONTEND_URL}/password/new?token=${actionToken}`;

            await ActionToken.create({token: actionToken, _user_id: _id, tokenType: FORGOT_PASSWORD});
            await emailService.sendEmail(email, FORGOT_PASS, {url: forgotPassFEUrl, userName: name})

            res.json('ok');
        } catch (e) {
            next(e);
        }
    },

    forgotPasswordAfterForgot: async (req, res, next) => {
        try {
            const {body, user} = req;

            const hashPassword = await oauthService.hashPassword(body.password);

            await ActionToken.deleteOne({token: req.get('Authorization')});
            await User.updateOne({_id: user._id}, {password: hashPassword});

            res.json('ok');
        } catch (e) {
            next(e);
        }
    },

    logout: async (req, res, next) => {
        try {
            const {accessToken} = req.tokenInfo;

            await OAuth.deleteOne({accessToken});

            res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    },

    logoutAll: async (req, res, next) => {
        try {
            const {_user_id} = req.tokenInfo;

            await OAuth.deleteMany({_user_id});

            res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    },

};
