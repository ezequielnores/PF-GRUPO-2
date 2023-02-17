const { Router } = require("express");
const {
    createTurn,
    getTurnById,
    findAllTurns,
    deleteTurnById,
    updateTurnById,
    findAllTurnsByDate,
    findAllTurnsByPatient,
    findAllTurnsByDoctor,
    deleteTurnsByExpiredDate
} = require("../controllers/turnsController");
const turnsRouter = Router();
const { Turns, Patient, Doctor } = require("../db");

turnsRouter.get("/", async (req, res) => {
    try {
        const turns = await findAllTurns();
        if (!turns) throw new Error("No se encuentran turnos en la BDD.");
        res.status(200).json(turns);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

turnsRouter.get("/turnsByDate", async (req, res) => {
    const { date } = req.body;

    try {
        if (!date) throw new Error("La fecha no esta definida.");

        const turnsByDate = await findAllTurnsByDate(date);
        if (!turnsByDate.length) throw new Error(`No se encuantran turnos en la BDD para la fecha ${date}.`);

        res.status(200).json(turnsByDate);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

turnsRouter.get("/turnsByPatient/:id", async (req, res) => {
    const { id } = req.params;

    try {
        if (!id) throw new Error("El id del paciente esta indefinido");

        const turnsByPatient = await findAllTurnsByPatient(id);
        if (!turnsByPatient.length) throw new Error(`No se encontro ningun turno del paciente con el id ${id} en la BDD.`);

        res.status(200).json(turnsByPatient);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

turnsRouter.get("/turnsByDoctor/:id", async (req, res) => {
    const { id } = req.params;

    try {
        if (!id) throw new Error("El id del paciente esta indefinido");

        const turnsByDoctor = await findAllTurnsByDoctor(id);
        if (!turnsByDoctor.length) throw new Error(`No se encontro ningun turno del doctor con el id ${id} en la BDD.`);

        res.status(200).json(turnsByDoctor);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

turnsRouter.get("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        if (!id) throw new Error("El id del turno esta indefinido.");

        const turn = await getTurnById(id);
        if (!turn) throw new Error(`No se encontro un turno con el id ${id}.`);
        res.status(200).json(turn);    
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

turnsRouter.delete("/delete/:id", async (req, res) => {
    const { id } = req.params;

    try {
        if (!id) throw new Error("El id del turno no esta definido.");
        const turnDeleted = await deleteTurnById(id);
        if (!turnDeleted) throw new Error(`No se a eliminado ningun turno con el id ${id}.`);
        res.status(200).json({ turnDeleted: turnDeleted });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

turnsRouter.delete("/deleteTurnsByExpiredDate", async (req, res) => {
    const { date } = req.body;

    try {
        if (!date) throw new Error("La fecha dada se encuentra indefinida.");

        const turnsDeleted = await deleteTurnsByExpiredDate(date);
        if (!turnsDeleted.length) throw new Error(`No se encuentran turnos para la fecha ${date} en la BDD.`);

        res.status(200).json(turnsDeleted);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

turnsRouter.post("/", async (req, res) => {
    const { availability, date, hour, type, ubication, doctorSpecialty, doctorId, patientId } = req.body;

    try {
        if (![availability, date, hour, doctorId, patientId, ubication, doctorSpecialty].every(Boolean)) {
            throw new Error("Datos incompletos.");
        }

        const turn = await createTurn(availability, date, hour, type, ubication, doctorSpecialty, doctorId, patientId);
        if (!turn) throw new Error("Error al crear el turno.");

        res.status(200).json(turn);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

turnsRouter.put("/update/:id", async (req, res) => {
    const { id } = req.params;
    const attributes = req.body;
    delete attributes.id;

    try {
        if (!id) throw new Error("El id del turno a actualizar no esta definido.");
        if (!attributes) throw new Error("No hay atributos modificados para actualizar el turno.");

        const turnUpdated = await updateTurnById(attributes, id);
        if (!turnUpdated) throw new Error("Error al actualizar el turno.");

        res.status(200).json({ turnUpdated: turnUpdated});
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = turnsRouter;