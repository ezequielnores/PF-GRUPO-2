const { Router } = require("express");
const {
    getTurnById,
    findAllTurns,
    deleteTurnById,
    updateTurnById
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

turnsRouter.get("/:id", async (req, res) => {
    const { id } = req.body;

    try {
        const turn = await getTurnById(id);
        if (!turn) throw new Error(`No se encontro un turno con el id ${id}.`);
        res.status(200).json(turn);    
    } catch (error) {
        
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

turnsRouter.post("/", async (req, res) => {
    const { availability, date, hour, type, medicId, patientId } = req.body;

    try {
        if (![availability, date, hour, medicId, patientId].every(Boolean)) {
            throw new Error("Datos incompletos.");
        }

        const turn = await Turns.create({
            availability: availability,
            date: date,
            hour: hour,
            type: type ? type : null,
        });

        const patient = await Patient.findByPk(patientId);
        if (!patient) throw new Error(`El paciente con el id ${patientId} no se encunetra en la BDD.`);

        const medic = await Doctor.findByPk(medicId);
        if (!medic) throw new Error(`El medico con el id ${medicId} no se encunetra en la BDD.`);

        await turn.addPatient(patient);
        await patient.addTurn(turn);

        await turn.addDoctor(medic);
        await medic.addTurn(turn);

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