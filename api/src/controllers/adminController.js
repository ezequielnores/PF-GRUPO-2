const { Admin } = require("../db.js");
const axios = require("axios");

const getAdmins = async () => {
  const infoAdmins = await Admin.findAll();
  return infoAdmins;
};

module.exports = {
  getAdmins,
};
