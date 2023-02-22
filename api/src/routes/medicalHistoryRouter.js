const { Router } = require("express");
const {
    createMedicalHistory,
    getMedicalHistoryById,
    findAllMedicalHistory,
    updateMedicalHistoryById,
    deleteMedicalHistoryById,
    addRegisterMedicalHistory,
    getMedicalHistoryByPatient
} = require("../controllers/medicalHistoryController");
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

medicalHistoryRouter.get("/medicalHistoryByPatient/:id", async (req, res) => {
    const { id } = req.params;

    try {
        if (!id) throw new Error("El id del paciente esta indefinido.");

        const medicalHistoryByPatient = await getMedicalHistoryByPatient(id);
        if (!medicalHistoryByPatient) {
            throw new Error(`No se encontro ningun historial clinico del paciente con el id ${id} en la BDD.`);
        }

        res.status(200).json(medicalHistoryByPatient);
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
    const { patientId, doctorId, date, hour, reason, treatment, diagnosis  } = req.body;

    try {
        if (![patientId, doctorId, date, diagnosis].every(Boolean)) {
            throw new Error("Datos incompletos.");
        }

        const medicalHistory = await createMedicalHistory(patientId, doctorId, date, hour, reason, treatment, diagnosis);

        if (!medicalHistory) throw new Error("Error al crear el historial clinico.");

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
    const { doctorId, date, hour, reason, treatment, diagnosis } = req.body;

    try {
        if (!id) throw new Error("El id del historial clinico esta indefinido.");
        if (![doctorId, date, diagnosis].every(Boolean)) throw new Error("Datos incompletos.");

        const medicalHistory = await getMedicalHistoryById(id);
        if (!medicalHistory) throw new Error(`El historial clinico con el id ${id} no est en la BDD.`);
        
        const medicalHistoryNewRegister = await addRegisterMedicalHistory(
            medicalHistory.register, { doctorId, date, hour, reason, treatment, diagnosis }, medicalHistory.id
            );
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