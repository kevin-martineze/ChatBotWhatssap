const router = require('express').Router();
const messageController = require("../controllers/messages");

router.get('/bot/webhook', messageController.apiVerification)
router.post('/bot/webhook', messageController.messageInfo)

module.exports = router;