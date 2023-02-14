const { Router } = require("express");
const {
    getMedicalHistoryById,
    findAllMedicalHistory,
    updateMedicalHistoryById,
    deleteMedicalHistoryById
} = require("../controllers/medicalHistoryController");
const { MedicalHistory, Patient } = require("../db");
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