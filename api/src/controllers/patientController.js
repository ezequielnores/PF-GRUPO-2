const { Patient, Comments, Turns, PatientPlan } = require("../db.js");
const axios = require("axios");
// const Comments = require("../models/Comments.js");
// const Turns = require("../models/Turns.js")

const getPatient = async () => {
  const patientInfo = await Patient.findAll({
    include: [{ model: PatientPlan }],
  });
  return patientInfo;
};

const getPatientByMail = async (mail) => {
  const patientByMail = await Patient.findOne({
    where: { mail: mail },
    include: [{ model: PatientPlan }],
  });
  return patientByMail;
};

const getPatientActive = async () => {
  const allPatients = await getPatient();
  console.log("all" + allPatients);
  const filterPatient = allPatients.filter((e) => {
    return e.active === true;
  });
  return filterPatient;
};

const getPatientInactive = async () => {
  const allPatient = await getPatient();
  const filterPatient = await allPatient.filter((e) => {
    return e.active === false;
  });
  return filterPatient;
};

const setMakeDisableAdmin = async id => {
  const patient = await Patient.findByPk(id);
  await Patient.update({ admin: !patient.admin }, { where: { id: id } });
  return patient;
};

const changePassword = async (id, password) => {
  return await Patient.update({password: password}, {where: {id: id}});
}

module.exports = {
  getPatient,
  getPatientActive,
  getPatientInactive,
  getPatientByMail,
  setMakeDisableAdmin,
  changePassword,
};
