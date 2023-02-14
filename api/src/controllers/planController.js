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
  createPlan: async (req, res) => {
    const params = {
      ...req.body,
    };
    await Plans.create(params)
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  editPlan: async (req, res) => {
    const { id } = req.params;
    const params = req.body;
    delete params.id;

    await Plans.update(params, { where: { id: id } })
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  deletePlan: async (req, res) => {
    const { id } = req.params;
    await Plans.update({ state: false }, { where: { id: id } })
      .then((response) => res.status(200).json(response))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
};

module.exports = Controller;
