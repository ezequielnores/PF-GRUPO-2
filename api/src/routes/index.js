const { Router } = require("express");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const emailVerification = require('./emailVerification')

const turnsRouter = require("../routes/turnsRouter");

const planRouter = require("./plans.js");

const patientRouter = require("./patientRouter");

const medicalHistoryRouter = require("./medicalHistoryRouter");

const doctorRouter = require("./doctorRouter");

const frequentQuestionsRouter = require("./frequentQuestionsRouter");

const incomesRouter = require("./incomesRouter");

const commentsRouter = require("./commentsRouter");

const adminRouter = require("./adminRouter");

const blogRouter = require("./blogRouter");

const urgencyRouter = require("./urgencyRouter");

const paymentRouter = require("./paymentRouter");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/turns", turnsRouter);

router.use("/plans", planRouter);

router.use("/doctor", doctorRouter);

router.use("/patient", patientRouter);

router.use("/medicalHistory", medicalHistoryRouter);

router.use("/frequentQuestions", frequentQuestionsRouter);

router.use("/incomes", incomesRouter);

router.use("/comments", commentsRouter);

router.use("/admins", adminRouter);

router.use("/urgency", urgencyRouter);

router.use("/blog", blogRouter);

router.use("/payments", paymentRouter);

router.use('/emailVerification', emailVerification)

module.exports = router;
