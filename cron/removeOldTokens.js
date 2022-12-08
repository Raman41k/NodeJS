const {CronJob} = require('cron');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');

const OAuth = require('../dataBase/OAuth');

dayjs.extend(utc);

module.exports = new CronJob(
    '* * * * * *',
    async function () {
        try {
            console.log('start removing tokens!');
            const monthAgo = dayjs().utc().subtract(1, 'month');

            await OAuth.deleteMany({createdAt: {$lte: monthAgo}});
            console.log('end removing tokens!');
        } catch (e) {
            console.error(e);
        }
    }
);
