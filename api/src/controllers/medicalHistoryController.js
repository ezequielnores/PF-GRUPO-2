const { MedicalHistory, Patient } = require("../db");

const getMedicalHistoryById = async id => {
    const medicalHistory = await MedicalHistory.findByPk(id, { include: [Patient] });
    return medicalHistory;
};

const findAllMedicalHistory = async () => {
    const medicalHistories = await MedicalHistory.findAll();
    return medicalHistories;
};

const deleteMedicalHistoryById = async id => {
    const medicalHistoryDeleted = await MedicalHistory.destroy({ where: { id: id } });
    return medicalHistoryDeleted;
};

const updateMedicalHistoryById = async (attributes, id) => {
    const medicalHistoryUpdated = await MedicalHistory.update(attributes, { where: { id: id } });
    return medicalHistoryUpdated;
};

module.exports = {
    getMedicalHistoryById,
    findAllMedicalHistory,
    deleteMedicalHistoryById,
    updateMedicalHistoryById
};