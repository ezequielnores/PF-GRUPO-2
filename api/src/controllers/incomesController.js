const { Incomes, Patient } = require("../db");

const createIncome = async (patient, date, amount, detail) => {
    const incomeCreated = await Incomes.create({
        date: date,
        amount: amount,
        detail: detail
    });
    await patient.addIncome(incomeCreated.id);
    return incomeCreated;
};

const getIncomeById = async id => {
    const income = await Incomes.findByPk(id, { inlcude: [Patient] });
    return income;
};

const findAllIncomes = async () => {
    const incomes = await Incomes.findAll({
        attributes: ["id", "date", "amount", "detail"],
        include: [{ model: Patient }]
    });
    return incomes;
};

const findAllIncomesByPatient = async patientId => {
    const patient = await Patient.findByPk(patientId);
    const incomes = await patient.getIncomes();
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
    createIncome,
    getIncomeById,
    findAllIncomes,
    updateIncomeById,
    deleteIncomeById,
    findAllIncomesByPatient
};