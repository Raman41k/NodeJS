const twilio = require('twilio');

const {TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN} = require("../config/config");

const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);


const sendSms = async (message, phone) => {
    try {

        const smsResp = await client.messages.create({
            body: message,
            to: phone,
            messagingServiceSid: 'MGa88363363bf08a49a3ae2a580d9dd96d',
        });

        console.log(smsResp)

    } catch (e) {
    console.error(e.message);
    }


};

module.exports = {
    sendSms
};
