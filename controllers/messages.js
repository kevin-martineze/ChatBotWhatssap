const Messages = require('../models/messages')
const VERIFY_TOKEN = process.env.VERIFY_TOKEN;

const apiVerification = async (req, res) => {
    try {
        console.log('query', req.query)
        const {
            "hub.mode": mode,
            "hub.verify_token": token,
            "hub.challenge": challenge
        } = req.query;

        if( mode && token && mode === "subscribe" && token === VERIFY_TOKEN) {
            return res.status(200).send(challenge);
        } else {
            return res.status(403).send("unauthorized");
        }
    } catch (error) {
        return req.status(500).send(error)
    }
}

const messageInfo = async (req, res) => {
    console.log('body', JSON.stringify(req.body.entry));
    const body = req.body.entry[0].changes[0];
    const {
        value: {
            messages
        }
    } = body;

    const {
        from: phoneNumber,
        text: {
            body: messageText
        }
    } = messages[0]
    const formatNumber = phoneNumber.slice(0,2)+phoneNumber.slice(3);
    await Messages.sendTextMessage(messageText, formatNumber)
    return res.status(200).send()
}

module.exports = {
    apiVerification,
    messageInfo
}