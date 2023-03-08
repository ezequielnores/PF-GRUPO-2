const { Router } = require('express');
const emailVerificationHandler = require('../controllers/emailVerificationController.js')

const emailVerification = Router();

emailVerification.get('/', async (req,res) => {
    try {
        const response = await emailVerificationHandler(req.query)
        res.status(200).send(response);
    } catch (error) {
        res.status(400).send(`Error: ${error.message}`);
    }
})

module.exports = emailVerification;