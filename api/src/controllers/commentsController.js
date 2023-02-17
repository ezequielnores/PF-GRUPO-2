const { Comments, Patient, Doctor } = require('../db.js');
const axios = require("axios");


const getComments =  async () => {
    const infoComments = await Comments.findAll(
    );
    return infoComments;
};

const allCommentsByDoc = async (doctorId, patientId) => {
    const commentsDoc = await Comments.findAll({
        attributes: ['id', 'message'],
        include: [
            {
                model: Doctor,
                through: {
                    attributes: []
                }
            
            }
        ]
    })
}

module.exports = {
    getComments, 
    allCommentsByDoc
}
