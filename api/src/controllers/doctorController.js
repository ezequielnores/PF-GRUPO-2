const { Doctor } = require("../db.js");
const { cloudinary } = require("../utils/cloudinary")

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

const getDoctortByMail = async mail => {
    const doctorByMail = await Doctor.findOne({ where: { mail: mail } });
    return doctorByMail;
};

const postDoctor = async (name, lastName, mail, password, birthdate, image, location, dni, phone, speciality, license, cv, clinicMail) => {
    console.log("In the controlller post");
    try {
        if (image) var uploadedImageResponse = await cloudinary.uploader.upload(image, {upload_preset: "iCare_Henry"});
        const uploadedCvResponse = await cloudinary.uploader.upload(cv, {upload_preset: "iCare_Henry"});
        console.log("Just antes del create");
        const response = await Doctor.create({name, lastName, mail, password, birthdate, image: uploadedImageResponse ? uploadedImageResponse.url : null, location, dni, phone, speciality, license, cv: uploadedCvResponse.url, clinicMail});
        console.log("Esta es la respuesta "+ response);
        return response;
    } catch (error) {
        console.log(error.message);
    }
}

const putDoctor = async (id, values) => {
    const doctor = await Doctor.update(values, {where: {id: id}});
    return doctor;
}

const setDoctorActive = async (id) => {
    const doctorToSetActive = await Doctor.findByPk(id);
    await Doctor.update({ active: !doctorToSetActive.active }, { where: { id: id } });
    return doctorToSetActive;
};

const findByMail = async (mail) => {
    const doctor = await Doctor.findOne({where: {mail: mail}})
    return doctor
}

module.exports = {
    getDoctors,
    getDoctor,
    postDoctor,
    putDoctor,
    findByMail,
    getDoctortByMail,
    setDoctorActive
    }

