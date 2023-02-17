const { Patient, Comments, Turns } = require("../db.js");
const axios = require("axios");
// const Comments = require("../models/Comments.js");
// const Turns = require("../models/Turns.js")

const getPatientInfo = async () => {
    const patientInfo = await Patient.findAll({
    //     include: [{
    //         model: Comments,
    //         as: "comments",
    //         attribute: ['id', 'message']
    //     }
    //     // }, {
    //     //     model: Turns,
    //     //     as: "turns",
    //     //     attribute: ['availability', 'date', 'hour', 'type', 'ubication', 'doctorSpecialty'],
    //     //     where: {
    //     //         availability : true
    //     //     }

    //     // }]
    // ]
    });
    return patientInfo;
};

module.exports = {
    getPatientInfo
}