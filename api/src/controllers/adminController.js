const { Admin } = require("../db.js");
const axios = require("axios");

const findByMail = async (mail) => {
  const foundAdmin = await Admin.findOne({ where: { mail: mail } });
  return foundAdmin;
};

module.exports = {
  findByMail,
};
