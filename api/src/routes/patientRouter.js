const { Router } = require("express");
const axios = require("axios");
const { getPatientInfo } = require("../controllers/turnsController");
const { Patient } = require("../db");

const router = Router();

router.get('/', async (req, res)=>{
    try {
        const infoPatient = getPatientInfo();
        if(!infoPatient){
            res.status(404).send('No patients in the database!')
        }else{
            res.status(200).send(infoPatient)
        }
    } catch (error) {
       res.status(404).json({ error: error.message }) 
    }
})


router.get("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const getById = await getPatientInfo();
  
      if (id) {
        const patientById = getById.filter(
          (e) => e.id === id
        );
        if (patientById) {
          res.status(200).json(patientById);
        } else {
          res
            .status(404)
            .send("No patients were found with this ID.");
        }
      } else {
        res.status(404).send("No se encontró el id por params");
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  module.exports = router