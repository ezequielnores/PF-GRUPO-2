const { validate } =  require("deep-email-validator")
const { Patient, Doctor }  = require('../db.js')

const emailVerificationHandler = async ({ mail, model }) => {
    
    const userIsCreated = model === 'Patient' ? await Patient.findAll({ where: { mail: mail}  }) : await Doctor.findAll({ where: { mail: mail}  })
    
    const { valid } = await validate(mail);

    return valid && userIsCreated.length === 0;
}

module.exports = emailVerificationHandler;