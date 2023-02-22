const { MedicalHistory, Patient } = require("../db");

<<<<<<< HEAD
const createMedicalHistory = async (patientId, doctorId, date, hour, diagnosis,reason,prescription ) => {
    const medicalHistory = await MedicalHistory.create({
        register: [{ doctorId, date, hour, diagnosis,reason,prescription }],
=======
const createMedicalHistory = async (patientId, doctorId, date, hour, reason, treatment, diagnosis) => {
    const medicalHistory = await MedicalHistory.create({
        register: [{ doctorId, date, hour, reason, treatment, diagnosis }],
>>>>>>> 8150ce4a3f6849d6a1ad9cb69c0a0f3ad51f881b
    });
    await medicalHistory.setPatient(patientId);
    return medicalHistory;
};

const getMedicalHistoryById = async id => {
    const medicalHistory = await MedicalHistory.findByPk(id, { include: { model: Patient } });
    return medicalHistory;
};

const findAllMedicalHistory = async () => {
    const medicalHistories = await MedicalHistory.findAll({
        attributes: ["id", "register"],
        include: { model: Patient }
    });
    return medicalHistories;
};

const getMedicalHistoryByPatient = async patientId => {
    const medicalHistoryByPatient = await MedicalHistory.findOne({
        attributes: ["id", "register"],
        include: { model: Patient },
        where: { PatientId: patientId }
    });
    return medicalHistoryByPatient;
};

const deleteMedicalHistoryById = async id => {
    const medicalHistoryDeleted = await MedicalHistory.destroy({ where: { id: id } });
    return medicalHistoryDeleted;
};

const updateMedicalHistoryById = async (attributes, id) => {
    await MedicalHistory.update(attributes, { where: { id: id } });
    const medicalHistoryUpdated = await MedicalHistory.findByPk(id);
    return medicalHistoryUpdated;
};

const addRegisterMedicalHistory = async (oldRegister, newRegister, id) => {
    await MedicalHistory.update({
        register: [...oldRegister, newRegister]
    }, { where: { id: id } });
    const medicalHistoryUpdated = await MedicalHistory.findByPk(id);
    return medicalHistoryUpdated;
};

module.exports = {
    createMedicalHistory,
    getMedicalHistoryById,
    findAllMedicalHistory,
    deleteMedicalHistoryById,
    updateMedicalHistoryById,
    addRegisterMedicalHistory,
    getMedicalHistoryByPatient
};