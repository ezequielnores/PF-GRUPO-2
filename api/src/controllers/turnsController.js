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

const deleteTurnById = async id => {
    const turnDeleted = await Turns.destroy({ where: { id: id } });
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
    updateTurnById
};