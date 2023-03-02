const { Router } = require('express');
const { validate } =  require("deep-email-validator")

const emailVerification = Router();

emailVerification.get('/', async (req,res) => {
    try {
        const{ mail } = req.query;
        const { valid } = await validate(mail);
        res.status(200).send(valid);
    } catch (error) {
        res.status(400).send(`Error: ${error.message}`);
    }
})

module.exports = emailVerification;