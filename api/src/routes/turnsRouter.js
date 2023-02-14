const { Router } = require("express");
const {
    getTurnById,
    findAllTurns
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
        if (!turn) throw new Error(`No se encontro un turno con el id ${id}`);
        res.status(200).json(turn);    
    } catch (error) {
        
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

        await turn.addMedic(medic);
        await medic.addTurn(turn);

        res.status(200).json(turn);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = turnsRouter;