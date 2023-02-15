const { Patient } = require("../db.js");
const axios = require("axios");

const getPatientInfo = async () => {
    const patientInfo = await Patient.findAll();
    return patientInfo;
};

module.exports = {
    getPatientInfo
}