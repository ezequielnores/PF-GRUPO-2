const { Router } = require("express");
const {
    getMedicalHistoryById,
    findAllMedicalHistory,
    updateMedicalHistoryById,
    deleteMedicalHistoryById,
    addRegisterMedicalHistory
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

medicalHistoryRouter.put("/update/:id", async (req, res) => {
    const { id } = req.params;
    const attributes = req.body;
    delete attributes.id;

    try {
        if (!id) throw new Error("El id del historial clinico esta indefinido.");
        if (!attributes) throw new Error("Datos incompletos para actualizar.");

        const medicalHistoryUpdated = await updateMedicalHistoryById(attributes, id);
        if (!medicalHistoryUpdated) throw new Error(`EL historial clinico con el id ${id} no esta en la BDD.`);

        res.status(200).json(medicalHistoryUpdated);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

medicalHistoryRouter.put("/addRegister/:id", async (req, res) => {
    const { id } = req.params;
    const { doctorId, date, diagnosis } = req.body;

    try {
        if (!id) throw new Error("El id del historial clinico esta indefinido.");
        if (![doctorId, date, diagnosis].every(Boolean)) throw new Error("Datos incompletos.");

        const medicalHistory = await getMedicalHistoryById(id);
        if (!medicalHistory) throw new Error(`El historial clinico con el id ${id} no est en la BDD.`);
        
        const medicalHistoryNewRegister = await addRegisterMedicalHistory(medicalHistory.register, { doctorId, date, diagnosis }, medicalHistory.id);
        if (!medicalHistoryNewRegister) throw new Error("Error al agregar un nuevo registro.");

        res.status(200).json(medicalHistoryNewRegister);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

medicalHistoryRouter.delete("/delete/:id", async (req, res) => {
    const { id } = req.params;

    try {
        if (!id) throw new Error("El id del historial clinico esta indefinido.");

        const medicalHistoryDeleted = await deleteMedicalHistoryById(id);
        if (!medicalHistoryDeleted) {
            throw new Error(`No se encuentra un historial clinico con el id ${id} en la BDD.`);
        }

        res.status(200).json(medicalHistoryDeleted);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = medicalHistoryRouter;