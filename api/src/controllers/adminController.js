const { Admins } = require('../db.js')
const axios = require("axios")

const getAdmins = async () => {
    const infoAdmins = await Admins.findAll();
    return infoAdmins;
};

module.exports = {
    getAdmins
}