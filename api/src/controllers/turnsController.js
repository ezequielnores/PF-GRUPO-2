const { Turns, Patient, Medic } = require("../db");

const getTurnById = async id => {
    const turn = await Turns.findByPk(id, { include: [Patient, Medic] });
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
                model: Medic,
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