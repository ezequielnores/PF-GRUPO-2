const { MedicalHistory, Patient } = require("../db");

const getMedicalHistoryById = async id => {
    const medicalHistory = await MedicalHistory.findByPk(id, { include: { model: Patient } });
    return medicalHistory;
};

const findAllMedicalHistory = async () => {
    const medicalHistories = await MedicalHistory.findAll({
        attributes: ["id", "register"],
        include: [
            {
                model: Patient,
                through: {
                    attributes: []
                }
            }
        ]
    });
    return medicalHistories;
};

const findAllMedicalHistoryByPatient = async patientId => {
    const medicalHistoryByPatient = await MedicalHistory.findAll({
        attributes: ["id", "register"],
        include: [
            {
                model: Patient,
                through: {
                    attributes: []
                }
            }
        ],
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
    getMedicalHistoryById,
    findAllMedicalHistory,
    deleteMedicalHistoryById,
    updateMedicalHistoryById,
    addRegisterMedicalHistory,
    findAllMedicalHistoryByPatient
};