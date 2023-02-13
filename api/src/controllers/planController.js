const { Plans } = require("../db.js");

const Controller = {
  getPlans: async (req, res) => {
    await Plans.findAll({
      where: {
        state: true,
      },
    })
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((err) => {
        res.status(400).send(err.message);
      });
  },
  createPlan: async (req, res) => {},
  editPlan: async (req, res) => {},
  deletePlan: async (req, res) => {},
};

module.exports = Controller;
