const { Turns, Patient, Doctor } = require("../db");
const { Op } = require("sequelize");

const createTurn = async (availability, date, hour, type, ubication, doctorSpecialty, doctorId, patientId) => {
    const turn = await Turns.create({
        availability: availability,
        date: date,
        hour: hour,
        type: type ? type : null,
        ubication: ubication,
        doctorSpecialty: doctorSpecialty,
        attended: false
    });

    await turn.setDoctor(doctorId);
    await turn.setPatient(patientId);

    return turn;
};

const getTurnById = async id => {
    const turn = await Turns.findByPk(id, { include: [
        { model: Patient },
        { model: Doctor }
    ]});
    return turn;
};

const getTurnByDateAndHourAndDoctor = async (date, hour, doctorId) => {
    const turn = await Turns.findOne({
        attributes: ["id", "availability", "date", "hour", "type", "ubication", "doctorSpecialty", "attended"],
        include: [
            { model: Patient },
            { model: Doctor }
        ],
        where: { doctorId: doctorId, date: date, hour: hour }
    });
    return turn;
};

const findAllTurns = async () => {
    const turns = await Turns.findAll({
        attributes: ["id", "availability", "date", "hour", "type", "ubication", "doctorSpecialty", "attended"],
        include: [
            { model: Patient },
            { model: Doctor }
        ],
        order: [["date", "ASC"], ["hour", "ASC"]]
    });
    return turns;
};

const findAllTurnsAttended = async () => {
    const turns = await Turns.findAll({
        attributes: ["id", "availability", "date", "hour", "type", "ubication", "doctorSpecialty", "attended"],
        include: [
            { model: Patient },
            { model: Doctor }
        ],
        order: [["date", "ASC"], ["hour", "ASC"]],
        where: { attended: true }
    });
    return turns;
};

const findAllTurnsNoAttended = async () => {
    const turns = await Turns.findAll({
        attributes: ["id", "availability", "date", "hour", "type", "ubication", "doctorSpecialty", "attended"],
        include: [
            { model: Patient },
            { model: Doctor }
        ],
        order: [["date", "ASC"], ["hour", "ASC"]],
        where: { attended: false }
    });
    return turns;
};

const findAllTurnsByDate = async date => {
    const turnsByDate = await Turns.findAll({
        attributes: ["id", "availability", "date", "hour", "type", "ubication", "doctorSpecialty", "attended"],
        include: [
            { model: Patient },
            { model: Doctor }
        ],
        order: [["date", "ASC"], ["hour", "ASC"]],
        where: { date: date, attended: false }
    });
    return turnsByDate;
};


const findAllTurnsByDoctor = async doctorId => {
    const turnsByDoctor = await Turns.findAll({
        attributes: ["id", "availability", "date", "hour", "type", "ubication", "doctorSpecialty", "attended"],
        include: [
            { model: Patient },
            { model: Doctor }
        ],
        order: [["date", "ASC"], ["hour", "ASC"]],
        where: { doctorId: doctorId, attended: false }
    });
    return turnsByDoctor;
};

const findAllTurnsByPatient = async patientId => {
    const turnsByPatient = await Turns.findAll({
        attributes: ["id", "availability", "date", "hour", "type", "ubication", "doctorSpecialty", "attended"],
        include: [
            { model: Patient },
            { model: Doctor }
        ],
        order: [["date", "ASC"], ["hour", "ASC"]],
        where: { PatientId: patientId, attended: false }
    });
    return turnsByPatient;
};

const deleteTurnById = async id => {
    const turnDeleted = await Turns.destroy({ where: { id: id } });
    return turnDeleted;
};

const deleteTurnsByExpiredDate = async date => {
    const turnsDeleted = await Turns.destroy({ where: { date: { [Op.lt]: date } } });
    return turnsDeleted;
};

const updateTurnById = async (attributes, id) => {
    const turnToUpdate = await Turns.findOne({ where: { id: id }, include: [
        { model: Doctor }, { model: Patient }
    ] });

    if (attributes.doctorId) {
        const doctor = await Doctor.findByPk(attributes.doctorId);
        await turnToUpdate.setDoctor(doctor);
        await turnToUpdate.save();
        delete attributes.doctorId;
    }
    if (attributes.patientId) {
        const patient = await Patient.findByPk(attributes.patientId);
        await turnToUpdate.setDoctor(patient);
        await turnToUpdate.save();
        delete attributes.patientId;
    }

    if (!Object.values(attributes).length) {
        const turnUpdated = await Turns.findByPk(turnToUpdate.id, { include: [
            { model: Doctor }, { model: Patient }
        ] });
        return turnUpdated;
    }

    await Turns.update(attributes, { where: { id: id } });
    const turnUpdated2 = await Turns.findByPk(id, { include: [{ model: Doctor }, { model: Patient }] });
    return turnUpdated2;
};

module.exports = {
    createTurn,
    getTurnById,
    getTurnByDateAndHourAndDoctor,
    findAllTurns,
    deleteTurnById,
    updateTurnById,
    findAllTurnsByDate,
    findAllTurnsByDoctor,
    findAllTurnsAttended,
    findAllTurnsNoAttended,
    findAllTurnsByPatient,
    deleteTurnsByExpiredDate
};