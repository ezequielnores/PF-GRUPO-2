const { Comments, Patient, Doctor } = require('../db.js');
const axios = require("axios");


const getComments =  async () => {
    const infoComments = await Comments.findAll(
    );
    return infoComments;
};

const allCommentsByDoc = async (doctorId) => {
    const commentsDoc = await Comments.findAll({
        attributes: ['id', 'message', 'doctorId'],
        include: [
            {
                model: Doctor,
                attributes: ['name', 'lastName']
             
            
            } ] , where: { doctorId: doctorId }
       
    });
    return commentsDoc;
};

const allCommentsByPatient = async (patientId) => {
    const commentsPat = await Comments.findAll({
        attributes: ['id', 'message', 'PatientId'],
        include: [
            {
                model: Patient,
                attributes: ['name', 'surname']
             
            
            } ] , where: { PatientId: patientId }
       
    });
    return commentsPat;
};


module.exports = {
    getComments, 
    allCommentsByDoc,
    allCommentsByPatient

}
