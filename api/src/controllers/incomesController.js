const { Incomes, Patient } = require("../db");

const getIncomeById = async id => {
    const income = await Incomes.findByPk(id, { inlcude: [Patient] });
    return income;
};

const findAllIncomes = async () => {
    const incomes = await Incomes.findAll({
        attributes: ["id", "date", "amount", "detail"],
        include: [
            {
                model: Patient,
                through: {
                    attributes: []
                }
            }
        ]
    });
    return incomes;
};

const findAllIncomesByPatient = async patientId => {
    const incomes = await Incomes.findAll({
        attributes: ["id", "date", "amount", "detail"],
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
    return incomes;
};

const updateIncomeById = async (attributes, id) => {
    const incomeUpdated = await Incomes.update(attributes, { where: { id: id } });
    return incomeUpdated;
};

const deleteIncomeById = async id => {
    const incomeDeleted = await Incomes.destroy({ where: { id: id } });
    return incomeDeleted;
};

module.exports = {
    getIncomeById,
    findAllIncomes,
    updateIncomeById,
    deleteIncomeById,
    findAllIncomesByPatient
};