const { Urgency, Patient } = require("../db.js");

const getUrgencies = async (patientId) => {
    const response = await Urgency.findAll({
        attributes: ['id', 'symptomatology', 'attended', 'PatientId'],
        include: {
            model: Patient,
            attributes: ['name', 'surname']
        }, where: { PatientId: patientId }
    });
    return response;
};

const getNotAttendedUrgencies = async (patientId) => {
    const response = await Urgency.findAll({
        attributes: ['id', 'symptomatology', 'attended', 'PatientId'],
        include: {
            model: Patient,
            attributes: ['name', 'surname']
        }, where: { PatientId: patientId }
    });
    const filterResponse = response.filter((urgency) => {
        return urgency.dataValues.attended === false
    });
    return filterResponse;
}

const getUrgency = async (id) => {
    const response = await Urgency.findByPk(id, { include: 
        { model: Patient},
    });
    return response;
};

const postUrgency = async (symptomatology , attended) => {
    const response = await Urgency.create({symptomatology , attended});
    return response;
};

const putUrgency = async (id, attended) => {
    const response = await Urgency.update(attended, {where: {id:id}});
    return response;
}

module.exports = {
    getUrgencies,
    getUrgency,
    postUrgency,
    putUrgency,
    getNotAttendedUrgencies
}