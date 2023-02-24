const { Router } = require("express");
const {
  getDoctors,
  getDoctor,
  postDoctor,
  putDoctor,
  findByMail,
  getDoctortByMail
} = require("../controllers/doctorController");

const router = Router();

router.get("/", async (req, res) => {
  const { name } = req.query;
  try {
    const doctors = await getDoctors(name);
    if (!doctors) throw new Error();
    res.status(200).send(doctors);
  } catch (error) {
    res.status(404).send("There are no doctors in Data Base");
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const doctor = await getDoctor(id);
    if (!doctor) throw new Error();
    res.status(200).send(doctor);
  } catch (error) {
    res.status(404).send("This doctor is not in Data Base");
  }
});

router.get("/doctorByMail", async (req, res) => {
  const { mail } = req.query;

  try {
    if (!mail) throw new Error("The mail is undefined.");

    const doctorByMail = await getDoctortByMail(mail);
    if (!doctorByMail) throw new Error(`Not found a doctor with mail ${mail} in the BDD.`);

    res.status(200).json(doctorByMail);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  const {
    name,
    lastName,
    mail,
    password,
    birthdate,
    image,
    location,
    dni,
    phone,
    speciality,
    license,
    cv,
    clinicMail,
  } = req.body;
  try {
    console.log(req.body);
    const doctor = await postDoctor(
      name,
      lastName,
      mail,
      password,
      birthdate,
      image,
      location,
      dni,
      phone,
      speciality,
      license,
      cv,
      clinicMail
    );
    if (!doctor) throw new Error();
    res.status(200).send(doctor);
  } catch (error) {
    res.status(400).send("The doctor was not created");
  }
});

router.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const values = req.body;
  try {
    const doctor = await putDoctor(id, values);
    res.status(200).send(doctor);
  } catch (error) {
    res.status(400).send("The doctor was not updated");
  }
});

router.post("/login", async (req, res) => {
  const { mail, password } = req.body;
  await findByMail(mail)
    .then((response) => {
      if (response.password == password) {
        delete response.password;
        res.status(200).json(response);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(200).send("Incorrect login information");
    });
});

module.exports = router;
