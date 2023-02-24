const { Admin } = require("../db.js");
const axios = require("axios");

const getAdmins = async () => {
  const infoAdmins = await Admin.findAll();
  return infoAdmins;
};

const findByMail = async (mail) => {
  const foundAdmin = await Admin.findOne({ where: { mail: mail } });
  return foundAdmin;
};

module.exports = {
  getAdmins,
  findByMail,
};
