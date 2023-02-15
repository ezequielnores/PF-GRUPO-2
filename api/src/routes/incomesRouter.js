const { Router } = require("express");
const {
    getIncomeById,
    findAllIncomes,
    updateIncomeById,
    deleteIncomeById
} = require("../controllers/incomesController");
const { Income, Patient } = require("../db");
const incomesRouter = Router();

incomesRouter.get("/", async (req, res) => {
    try {
        const incomes = await findAllIncomes();
        if (!incomes.length) throw new Error("Aun no hay ingresos cargados en la BDD.");

        res.status(200).json(incomes);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = incomesRouter;