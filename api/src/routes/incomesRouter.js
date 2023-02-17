const { Router } = require("express");
const {
    createIncome,
    getIncomeById,
    findAllIncomes,
    updateIncomeById,
    deleteIncomeById,
    findAllIncomesByPatient
} = require("../controllers/incomesController");
const { Patient } = require("../db");
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

incomesRouter.get("/incomesByPatient/:id", async (req, res) => {
    const { id } = req.params;

    try {
        if (!id) throw new Error("El id del paciente no esta indefinido.");

        const incomesByPatient = await findAllIncomesByPatient(id);
        if (!incomesByPatient.length) {
            throw new Error(`No se encuentran ingresos del paciente con el id ${id} no esta en la BDD.`);
        }

        res.status(200).json(incomesByPatient);
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

incomesRouter.post("/", async (req, res) => {
    const { patientId, date, amount, detail } = req.body;

    try {
        if (![patientId, date, amount, detail].every(Boolean)) {
            throw new Error("Datos incompletos.");
        }

        const patient = await Patient.findByPk(patientId);
        if (!patient) throw new Error(`No se encuentra ningun paciente en la BDD con el id ${id}.`);

        const incomeCreated = await createIncome(patient, date, amount, detail);
        if (!incomeCreated) throw new Error("Error al crear el ingreso.");

        res.status(200).json(incomeCreated);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

incomesRouter.put("/update/:id", async (req, res) => {
    const { id } = req.params;
    const attributes = req.body;
    delete attributes.id;

    try {
        if (![id, attributes].every(Boolean)) throw new Error("Datos incompletos para actualizar.");

        const incomeUpdated = await updateIncomeById(attributes, id);
        if (!incomeUpdated) throw new Error(`No se encunetra ningun ingreso en la BDD con el id ${id}.`);

        res.status(200).json(incomeUpdated);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

incomesRouter.delete("/delete/:id", async (req, res) => {
    const { id } = req.params;

    try {
        if (!id) throw new Error("Error al obtener el id del ingreso desde params.");

        const incomeDeleted = await deleteIncomeById(id);
        if (!incomeDeleted) throw new Error(`No se encuentra ningun ingres en la BDD con el id ${id}.`);

        res.status(200).json(incomeDeleted);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = incomesRouter;