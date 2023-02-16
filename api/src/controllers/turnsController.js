const { Turns, Patient, Doctor } = require("../db");
const { Op } = require("sequelize");

const getTurnById = async id => {
    const turn = await Turns.findByPk(id, { include: [Patient, Doctor] });
    return turn;
};

const findAllTurns = async () => {
    const turns = await Turns.findAll({
        attributes: ["id", "availability", "date", "hour", "type", "ubication", "doctorSpecialty"],
        include: [
            {
                model: Patient,
                through: {
                    attributes: []
                }
            },
            {
                model: Doctor,
                through: {
                    attributes: []
                }
            }
        ]
    });
    return turns;
};

const findAllTurnsByDate = async date => {
    const turnsByDate = await Turns.findAll({
        attributes: ["id", "availability", "date", "hour", "type", "ubication", "doctorSpecialty"],
        include: [
            {
                model: Patient,
                through: {
                    attributes: []
                }
            },
            {
                model: Doctor,
                through: {
                    attributes: []
                }
            }
        ],
        where: { date: date }
    });
    return turnsByDate;
};

const findAllTurnsByDoctor = async doctorId => {
    const turnsByDoctor = await Turns.findAll({
        attributes: ["id", "availability", "date", "hour", "type", "ubication", "doctorSpecialty"],
        include: [
            {
                model: Patient,
                through: {
                    attributes: []
                }
            },
            {
                model: Doctor,
                through: {
                    attributes: []
                }
            }
        ],
        where: { DoctorId: doctorId }
    });
    return turnsByDoctor;
};

const findAllTurnsByPatient = async patientId => {
    const turnsByPatient = await Turns.findAll({
        attributes: ["id", "availability", "date", "hour", "type", "ubication", "doctorSpecialty"],
        include: [
            {
                model: Patient,
                through: {
                    attributes: []
                }
            },
            {
                model: Doctor,
                through: {
                    attributes: []
                }
            }
        ],
        where: { PatientId: patientId }
    });
    return turnsByPatient;
};

const deleteTurnById = async id => {
    const turnDeleted = await Turns.destroy({ where: { id: id } });
    return turnDeleted;
};

const deleteTurnByExpiredDate = async date => {
    const turnDeleted = await Turns.destroy({ where: { date: { [Op.lt]: date } } });
    return turnDeleted;
};

const updateTurnById = async (attributes, id) => {
    const turnUpdated = await Turns.update(attributes, { where: { id: id } });
    return turnUpdated;
};

module.exports = {
    getTurnById,
    findAllTurns,
    deleteTurnById,
    updateTurnById,
    findAllTurnsByDate,
    findAllTurnsByDoctor,
    findAllTurnsByPatient
};