const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const turnsRouter = require("../routes/turnsRouter");

const planRouter = require("./plans.js");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/turns", turnsRouter);

router.use("/plans", planRouter);

module.exports = router;
