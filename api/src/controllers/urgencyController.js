const { Urgency } = require("../db.js");

const getUrgencies = async () => {
    const response = await Urgency.findAll();
    return response;
};

const getNotAttendedUrgencies = async () => {
    const response = await Urgency.findAll();
    const filterResponse = response.filter((urgency) => {
        return urgency.dataValues.attended === false
    });
    return filterResponse;
}

const getUrgency = async (id) => {
    const response = await Urgency.findByPk(id);
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