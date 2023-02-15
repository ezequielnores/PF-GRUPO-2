const { Router } = require("express");
const axios = require("axios");
const { getPatientInfo } = require("../controllers/patientController");
const { Patient } = require("../db");

const router = Router();

router.get('/', async (req, res)=>{
  try {
    const { name } = req.query;
    const allPatient = getPatientInfo();
    if(name){
      const patientName = await allPatient.filter((e) => {
          e.name.toLowerCase().includes(name.toLowerCase())
      });
      if(patientName.length){
        res.status(200).send(patientName)
      } else {
        res.status(404).send('Patient not found')
      }
    } else {
      res.status(200).send(allPatient)
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
          res.status(404).send("No patients were found with this ID.");
        }
      } else {
        res.status(404).send("No se encontró el id por params");
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });


router.put("/edit/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      surname,
      mail,
      password,
      birthday,
      weight,
      height,
      bmi,
      allergies,
      chronicDiseases,
      photo,
      location,
      dni,
      phone,
      socialSecurity,
      plan,
      active,
      historyPayment
    } = req.body;
    if (id) {  
      if (name) {
        const findPatient = await Patient.findByPk(id);
        await findPatient.update(
          {
            name,
            surname,
            mail,
            password,
            birthday,
            weight,
            height,
            bmi,
            allergies,
            chronicDiseases,
            photo,
            location,
            dni,
            phone,
            socialSecurity,
            plan,
            active,
            historyPayment
          },
          { where: { id: id } }
        );

        res.status(200).send("Paciente modificado con exito");
      } else {
        res.status(400).send("Faltaron datos para modificar el paciente");
      }
    }
  } catch (error) {
    console.log("Error del put", error);
  }
});
  
  module.exports = router;
  
