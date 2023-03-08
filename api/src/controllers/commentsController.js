const { Comments, Patient, Doctor, Report } = require('../db.js');
const axios = require("axios");
const BadWords = require("bad-words");

const filter = new BadWords();

var newBadWords = [ 
    "Alcornoque",
    "Baboso",
    "Bellaco",
    "Bobalicón",
    "Boludo",
    "Capullo",
    "Caracaballo",
    "Caraculo",
    "Carajo",
    "Chupasangre",
    "Cretino",
    "Culo",
    "Descerebrado",
    "Desgraciado",
    "Donnadie", 
    "Energúmeno",    
    "Fantoche",    
    "Gandúl",   
    "Huevón", 
    "Mierda",   
    "Lameculos",    
    "Lerdo",    
    "Longanizas",   
    "Malparido",   
    "Mentecato",    
    "Mequetrefe",   
    "Palurdo",    
    "Pamplinas",    
    "Panoli",   
    "Papanatas",    
    "Patán",    
    "Pazguato",    
    "Pelagatos",
    "Pelele",  
    "Pelotudo",
    "Pendejo", 
    "Piltrafa",
    "Piojoso",
    "Pocasluces",   
    "Rastrapajo", 
    "Retrasado",
    "Sabandija",
    "Sonso",
    "Sorete",
    "Tarado",
    "Zarrapastroso",  
    "Zopenco",   
    "Zoquete"
];

filter.addWords(...newBadWords)


const getComments =  async () => {
    const infoComments = await Comments.findAll({
        attributes: ['id', 'rating', 'title', 'message', 'doctorId', 'PatientId' ],
        include: [
            {
                model: Doctor,
                attributes: ['name', 'lastName', "mail"]
            },
            {
                model: Patient,
                attributes: ['name', 'surname', "mail"]
            },
            {
                model: Report,
                as: "reports"
            }
        ],
    });
    return infoComments;
};

const allCommentsByDoc = async (doctorId) => {
    const commentsDoc = await Comments.findAll({
        attributes: ['id', 'rating', 'title', 'message', 'doctorId', 'PatientId' ],
        include: [
            {
                model: Doctor,
                attributes: ['name', 'lastName']
            },{
                model: Patient,
                attributes: ['name', 'surname']
            } ] , where: { doctorId: doctorId }
       
    });
    return commentsDoc;
};

const allCommentsByPatient = async (patientId) => {
    const commentsPat = await Comments.findAll({
        attributes: ['id', 'rating', 'title', 'message', 'doctorId', 'PatientId'],
        include: [
            {
                model: Patient,
                attributes: ['name', 'surname']  
            }, {
                model: Doctor,
                attributes: ['name', 'lastName']
            } ] , where: { PatientId: patientId }
    });
    return commentsPat;
};

const containOffensiveWords = (text) => {
    const filtrado = filter.clean(text)
    return filtrado;
};


module.exports = {
    getComments, 
    allCommentsByDoc,
    allCommentsByPatient,
    containOffensiveWords

}
