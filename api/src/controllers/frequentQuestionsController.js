const { FrequentQuestions } = require("../db");

const createFrequentAsk = async (answer, ask) => {
    const frequentAskCreated = await FrequentQuestions.create({
        answer: answer,
        ask: ask
    });
    return frequentAskCreated;
};

const getFrequentAskById = async id => {
    const frequentAsk = await FrequentQuestions.findByPk(id);
    return frequentAsk;
};

const getFrequentAskByAsk = async ask => {
    const frequentAsk = await FrequentQuestions.findOne({ where: { ask: ask } });
    return frequentAsk;
};

const findAllFrequentQuestions = async () => {
    const frequentQuestions = await FrequentQuestions.findAll();
    return frequentQuestions;
};

const updateFrequentAskById = async (attributes, id) => {
    const frequentAskUpdated = await FrequentQuestions.update(attributes, { where: { id: id } });
    return frequentAskUpdated;
};

const deleteFrequentAskById = async id => {
    const frequentAskDeleted = await FrequentQuestions.destroy({ where: { id: id } });
    return frequentAskDeleted;
};

module.exports = {
    createFrequentAsk,
    getFrequentAskById,
    findAllFrequentQuestions,
    updateFrequentAskById,
    deleteFrequentAskById,
    getFrequentAskByAsk
};