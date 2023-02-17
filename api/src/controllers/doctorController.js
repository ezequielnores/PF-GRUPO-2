const { Doctor } = require("../db.js");

const getDoctors = async (name) => {
    const response = await Doctor.findAll();
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

const postDoctor = async (name, lastName, mail, password, birthdate, image, location, dni, phone, speciality, lisence, cv, clinicMail) => {
    const response = await Doctor.create({name, lastName, mail, password, birthdate, image, location, dni, phone, speciality, lisence, cv, clinicMail});
    return response;
}

const putDoctor = async (id, values) => {
    const doctor = await Doctor.update(values, {where: {id: id}});
    return doctor;
}

const findByMail = async (mail) => {
    const doctor = await Doctor.findOne({where: {mail: mail}})
    return doctor
}

module.exports = {
    getDoctors,
    getDoctor,
    postDoctor,
    putDoctor,
    findByMail
}