module.exports = {
    PORT: process.env.PORT || 5000,
    DB_PASSWORD: process.env.DB_PASSWORD || '153215321',
    MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost:27017/test',

    ACCESS_SECRET: process.env.SECRETWORLD || 'secretWorld',
    REFRESH_SECRET: process.env.SECRETREFRESHWORLD || 'secretRefreshWorld',
}