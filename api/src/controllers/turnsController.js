const { Turns, Patient, Doctor } = require("../db");

const getTurnById = async id => {
    const turn = await Turns.findByPk(id, { include: [Patient, Doctor] });
    return turn;
};

const findAllTurns = async () => {
    const turns = await Turns.findAll({
        attributes: ["id", "availability", "date", "hour", "type"],
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

module.exports = {
    getTurnById,
    findAllTurns
};