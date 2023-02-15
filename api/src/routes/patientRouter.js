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
        // let urlDeImagen = "";
  
        // if (photo) {
        //   urlDeImagen = photo;
        // } else {
        //   urlDeImagen =
        //     "url imagen tipo";
        // }
  
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
  
          // const typeDb = await Type.findAll({
          //   where: { name: types },
          // });
          // await findPokemon.setTypes(typeDb);
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
  
