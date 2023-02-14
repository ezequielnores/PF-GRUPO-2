const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const turnsRouter = require("../routes/turnsRouter");

const planRouter = require("./plans.js");

const patientRouter = require("./patientRouter");

const medicalHistoryRouter = require("./medicalHistoryRouter");

const frequentQuestionsRouter = require("./frequentQuestionsRouter");


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/turns", turnsRouter);

router.use("/plans", planRouter);

router.use("/patient", patientRouter);

router.use("/medicalHistory", medicalHistoryRouter);

router.use("/frequentQuestions", frequentQuestionsRouter);

module.exports = router;
