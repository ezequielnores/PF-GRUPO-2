const { Router } = require("express");
const axios = require("axios");
const { Op } = require("sequelize");
const { cloudinary } = require("../utils/cloudinary");
const {PatientPlan} = require("../db");

const {
  getPatient,
  getPatientActive,
  getPatientInactive,
  getPatientByMail
} = require("../controllers/patientController.js");

const { Patient } = require("../db");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const allPatient = await getPatient();
    if (allPatient.length) {
      res.status(200).send(allPatient);
    } else {
      res.status(404).send("No patients en DB");
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.get("/patientByMail", async (req, res) => {
  const { mail } = req.query;

  try {
    if (!mail) throw new Error("El mail esta indefinido.");

    const patientByMail = await getPatientByMail(mail);
    if (!patientByMail) throw new Error(`No se encontro ningun paciente con el mail ${mail} en la BDD.`);

    res.status(200).json(patientByMail);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//------------------------ busca pacientes por coincidencia en nombre o apellido
router.get("/find", async (req, res) => {
  try {
    const { input } = req.query;
    console.log("input: " + input);
    const allPatients = await getPatient();
    const filterPatient = await Patient.findAll({
      where: {
        [Op.or]: [
          {
            name: {
              [Op.iLike]: `${input}%`,
            },
          },
          {
            surname: {
              [Op.iLike]: `${input}%`,
            },
          },
        ],
      },
    });
    if (filterPatient.length) {
      res.status(200).json(filterPatient);
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

//------------------------ trae todos los pacientes activos
router.get("/active", async (req, res) => {
  try {
    const patientAct = await getPatientActive();
    if (patientAct.length) {
      res.status(200).send(patientAct);
    } else {
      res.status(404).send("No active patients");
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

//------------------------ trae todos los pacientes inactivos
router.get("/inactive", async (req, res) => {
  try {
    const patientInac = await getPatientInactive();

    if (patientInac.length) {
      res.status(200).send(patientInac);
    } else {
      res.status(404).send("No inactive patients");
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const getById = await getPatient();

    if (id) {
      const patientById = await Patient.findByPk(id, {include: [{ model: PatientPlan }]});
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
    image,
    location,
    dni,
    phone,
    socialSecurity,
    active,
    uid
  } = req.body;
  try {
    if (
      !name ||
      !surname ||
      !mail ||
      !weight ||
      !height ||
      !location ||
      !dni
    ) {
      res.status(400).send("faltan datos");
    } else {
      if (image)
        var uploadedResponse = await cloudinary.uploader.upload(image, {
          upload_preset: "iCare_Henry",
        });

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
        photo: uploadedResponse ? uploadedResponse.url : null,
        location: location,
        dni: dni,
        phone: phone,
        socialSecurity: socialSecurity,
        active: active,
        uid: uid
      });
      res.status(200).send(newPatient);
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: error.message });
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

// router.put("/edit/:id", async (req, res) => {
//   const { id } = req.params;
//   const attributes = req.body;

//   try {
//     if (!id || !Object.values(attributes).length) {
//       console.log("datos incompletos");
//       throw new Error("Datos incompletos.");
//     }
//     console.log(attributes);
//     await Patient.update(attributes, { where: { id: id } });
//     const patientUpdated = await Patient.findByPk(id);
//     if (!patientUpdated) throw new Error(`El paciente con el id ${id} no se encuentra en la BDD.`);

//     res.status(200).json(patientUpdated);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

router.put("/setActive/:id", async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) throw new Error(`El id esta indefinido.`);

    const patieToSetActive = await Patient.findByPk(id);
    if (!patieToSetActive) throw new Error(`El paciente con el id ${id} no se encuentra en la BDD.`);
    await Patient.update({ active: !patieToSetActive.active }, { where: { id: id } });

    res.status(200).json(patieToSetActive);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const patientDelete = await Patient.findByPk(id);
    if (!patientDelete) {
      res.status(404).send("Patient not found");
    } else {
      patientDelete.update({ active: false }, { where: { id: id } });
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
