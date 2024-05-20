const API_VERSION = process.env.API_VERSION;
const BOT_NUMBER_ID = process.env.BOT_NUMBER_ID;
const TOKEN = process.env.TOKEN;
const axios = require("axios");

const sendTextMessage = async (text, phoneNumber) => {
  try {
    const url = `https://graph.facebook.com/${API_VERSION}/${BOT_NUMBER_ID}/messages`;
    const body = {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: phoneNumber,
      type: "text",
      text: {
        preview_url: false,
        body: text
      },
    };

    const config = { headers: { 'Authorization': `Bearer ${TOKEN}` , 'Content-Type': 'application/json' } };
    const result = await axios.post(url, body, config);
    console.log('result', result.data);
    return result
  } catch (error) {
    console.log("error", error?.response?.data);
    throw new Error(error?.response?.data?.error?.message);
  }
};

module.exports = {
    sendTextMessage
}
