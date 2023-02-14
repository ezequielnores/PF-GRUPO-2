const { Router } = require("express");
const {
    getMedicalHistoryById,
    findAllMedicalHistory,
    updateMedicalHistoryById,
    deleteMedicalHistoryById
} = require("../controllers/medicalHistoryController");
const { MedicalHistory, Patient, Doctor } = require("../db");
const medicalHistoryRouter = Router();

medicalHistoryRouter.get("/", async (req, res) => {
    try {
        const medicalHistories = await findAllMedicalHistory();
        if (!medicalHistories.length) throw new Error("No se encuentran historiales medicos en la BDD.");
        res.status(200).json(medicalHistories);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

medicalHistoryRouter.get("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        if (!id) throw new Error("El id de la historia clinica esta indefinido.");
        const medicalHistory = await getMedicalHistoryById(id);
        if (!medicalHistory) throw new Error(`El historial clinico con el id ${id} no esta en la BDD.`);
        
        res.status(200).json(medicalHistory);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

medicalHistoryRouter.post("/", async (req, res) => {
    const { patientId, doctorId, date, diagnosis } = req.body;

    try {
        if (![patientId, doctorId, date, diagnosis].every(Boolean)) {
            throw new Error("Datos incompletos.");
        }

        const medicalHistory = await MedicalHistory.create({
            register: [{ doctorId, date, diagnosis }]
        });

        const patient = await Patient.findByPk(patientId);
        if (!patient) throw new Error(`El paciente con el id ${id} no se encuentra en la BDD.`);

        await medicalHistory.addPatient(patient);

        res.status(200).json(medicalHistory);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});