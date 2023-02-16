const { Urgency } = require("../db.js");

const getUrgencies = async () => {
    const response = await Urgency.getAll();
    return response;
};

const getNotAttendedUrgencies = async () => {
    const response = await Urgency.getAll();
    const filterResponse = response.filter((urgency) => {
        urgency.attended === false
    });
    return filterResponse;
}

const getUrgency = async (id) => {
    const response = await Urgency.getByPk(id);
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