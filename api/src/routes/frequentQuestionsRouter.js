const { Router } = require("express");
const {
    getFrequentAskById,
    findAllFrequentQuestions,
    updateFrequentAskById,
    deleteFrequentAskById
} = require("../controllers/frequentQuestionsController");
const { FrequentQuestions } = require("../db");
const frequentQuestionsRouter = Router();

frequentQuestionsRouter.get("/", async (req, res) => {
    try {
        const frequentQuestions = await findAllFrequentQuestions();
        if (!frequentQuestions.length) throw new Error("No se encuentran preguntas frecuentes en la BDD.");

        res.status(200).json(frequentQuestions);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = frequentQuestionsRouter;