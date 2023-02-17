const { Router } = require("express");
const axios = require("axios");

const { getPatient, getPatientActive, getPatientInactive } = require("../controllers/patientController.js");

const { Patient } = require("../db");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const { name } = req.query;
    const allPatient = await getPatient();
    if (name) {
      const patientName = await allPatient.filter((e) => {
        e.name.toLowerCase().includes(name.toLowerCase());
      });
      if (patientName.length) {
        res.status(200).send(patientName);
      } else {
        res.status(404).send("Patient not found");
      }
    } else {
      res.status(200).send(allPatient);
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});


//------------------------ trae todos los pacientes activos
router.get('/active', async (req, res) => {
  try {
    const patientAct = await getPatientActive();
    if(patientAct.length){
      res.status(200).send(patientAct);
    } else {
      res.status(404).send('No active patients')
    }
  } catch (error) {
      res.status(404).json({ error: error.message })
  }
});

//------------------------ trae todos los pacientes inactivos
router.get('/inactive', async (req, res) => {
  try {
    const patientInac = await getPatientInactive();

    if(patientInac.length){
      res.status(200).send(patientInac);
    } else {
      res.status(404).send('No inactive patients')
    }
  } catch (error) {
      res.status(404).json({ error: error.message })
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const getById = await getPatient();

    if (id) {
      const patientById = await Patient.findByPk(id);
      if (patientById) {
        res.status(200).json(patientById);
      } else {
        res.status(404).send("No patients were found with this ID.");
      }
    } else {
      res.status(404).send("Id not found");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
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
    active,
  } = req.body;
  
try {

  if(!name || !surname || !mail || !password || !weight || !height || !location || !dni){
    res.status(404).send('faltan datos')
  } else {
    const newPatient = await Patient.create({
      name: name, 
      surname: surname,
      mail: mail,
      password: password,
      birthday: birthday,
      weight: weight,
      height: height,
      bmi: bmi,
      allergies: allergies,
      chronicDiseases: chronicDiseases,
      photo: photo,
      location: location,
      dni: dni,
      phone: phone,
      socialSecurity: socialSecurity,
      active: active,
    });
    res.status(200).send('Patient create successfully')
  } 
} catch (error) {
  res.status(404).json({ error: error.message })
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
      active,
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
            active,
          },
          { where: { id: id } }
        );

        res.status(200).send("Patient modified successfully");
      } else {
        res.status(400).send("Missing data to modify patient");
      }
    }
  } catch (error) {
    console.log("Error del put", error);
  }
});

router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const patientDelete = await Patient.findByPk(id);
    console.log("id:" + id);
    if (!patientDelete) {
      res.status(404).send("Patient not found");
    } else {
      patientDelete.update({active: false}, {where: { id: id }});
      res.status(200).send("Patient delete successfully");
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.post("/login", async (req, res) => {
  const { mail, password } = req.body;
  await Patient.findOne({ where: { mail: mail } })
    .then((response) => {
      if (response.password == password) {
        delete response.password;
        res.status(200).json(response);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(404).send("Incorrect login information");
    });
});

module.exports = router;
