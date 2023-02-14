const { Doctor } = require("../db.js");

const getDoctors = async (name) => {
    const response = await Doctor.findall();
    if (name) {
        const filterResponse = response.filter((doctor) => {
            doctor.name.includes(name);
        });
        return filterResponse;
    }
    return response;
}

const getDoctor = async (id) => {
    const response = await Doctor.findByPk(id);
    return response;
}

module.exports = {
    getDoctors,
    getDoctor
}