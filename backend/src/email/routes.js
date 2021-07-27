const express = require("express");
const router = express.Router();

const sendEmail = require("./email/index");

router.post("/send-forgot-password-email", sendEmail);

module.exports = router;
