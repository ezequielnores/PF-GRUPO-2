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

incomesRouter.get("/:id", async (req, res) => {
    const { id } = req.params;


    try {
        if (!id) throw new Error("Error al obtener el id desde params.");

        const income = await getIncomeById(id);
        if (!income) throw new Error(`No se encuentra ningun ingreso en la BDD con el id ${id}.`);

        res.status(200).json(income);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = incomesRouter;