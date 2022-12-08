const {CronJob} = require('cron');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');

const OldPassword = require('../dataBase/OldPassword');

dayjs.extend(utc);

module.exports = new CronJob(
    '* * * * * *',
    async function () {
        try {
            console.log('start removing passwords!');
            const yearAgo = dayjs().utc().subtract(1, 'year');

            await OldPassword.deleteMany({createdAt: {$lte: yearAgo}});
            console.log('end removing passwords!');
        } catch (e) {
            console.error(e);
        }
    }
);
