const { Comments, Doctor } = require('../db.js');
const axios = require("axios");


const getComments =  async () => {
    const infoComments = await Comments.findAll({
        include:{
            model: Doctor,
            attributes: ['id', 'name', 'lastName'],
            through:{
                attributes:[],
            }
        }
    });
    return infoComments;
};

module.exports = {
    getComments
}
