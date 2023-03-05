const { validate } =  require("deep-email-validator")
const { Patient, Doctor }  = require('../db.js')

const emailVerificationHandler = async ({ mail }) => {
    
    const comprobation = Promise.all([
            Patient.findAll({ where: { mail: mail}  }),
            Doctor.findAll({ where: { mail: mail}  }),
            validate(mail)
            ])
    .then(array => array[0].length === 0 && array[1].length === 0 && array[2].valid === true)
    .catch(error => error.message)
    
    return comprobation;
}

module.exports = emailVerificationHandler;