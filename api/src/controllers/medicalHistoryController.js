const { MedicalHistory, Patient } = require("../db");

const createMedicalHistory = async (patientId, doctorId, date, diagnosis) => {
    const medicalHistory = await MedicalHistory.create({
        register: [{ doctorId, date, diagnosis }],
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
    const medicalHistoryUpdated = await MedicalHistory.update(attributes, { where: { id: id } });
    return medicalHistoryUpdated;
};

const addRegisterMedicalHistory = async (oldRegister, newRegister, id) => {
    const medicalHistoryUpdated = await MedicalHistory.update({
        register: [...oldRegister, newRegister]
    }, { where: { id: id } });
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