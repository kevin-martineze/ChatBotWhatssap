const VERIFY_TOKEN = process.env.VERIFY_TOKEN;
const Messages = require("../models/messages");
const apiVerification = async (req, res) => {
  try {
    const {
      "hub.mode": mode,
      "hub.verify_token": token,
      "hub.challenge": challenge,
    } = req.query;
    if (mode && token && mode === "subscribe" && token === VERIFY_TOKEN) {
      return res.status(200).send(challenge);
    } else {
      return res.status(403).send("unauthorized");
    }
  } catch (error) {
    return req.status(500).send(error);
  }
};

const messageInfo = async (req, res) => {
  console.log("body", JSON.stringify(req.body.entry));
  const body = req.body.entry[0].changes[0];
  const {
    value: { messages },
  } = body;

  if (!messages) return res.status(200).send();

  const {
    from: phoneNumber,
    id: messageId,
    text: { body: messageText },
  } = messages[0];

  // await Messages.sendTextMessage(messageText, phoneNumber);
  // await Messages.sendReplyTextMessage(messageText, phoneNumber, messageId);
  // await Messages.sendReactionMessage(phoneNumber, messageId)
  const options = {
    text: "https://www.freepik.es/foto-gratis/bola-verde-cara-casco_40574570.htm#query=png&position=0&from_view=keyword&track=sph&uuid=ee99e49d-3a6b-426c-bb7a-d77134521e93",
    phoneNumber,
    type: "image",
    messageId,
    reply: true,
  };
  await Messages.sendMessage(options);
  return res.status(200).send();
};

module.exports = {
  apiVerification,
  messageInfo,
};
