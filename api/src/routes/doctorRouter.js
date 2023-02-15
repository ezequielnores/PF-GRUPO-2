const { Router } = require("express");
const { getDoctors, getDoctor, postDoctor, putDoctor } = require("../controllers/doctorController");

const router = Router()


router.get("/", async (req, res) => {
    const {name} = req.query;
    try {
        const doctors = await getDoctors(name);
        if (!doctors) throw new Error();
        res.status(200).send(doctors);
    } catch (error) {
        res.status(404).send("There are no doctors in Data Base")
    }
});


router.get("/:id", async (req, res) => {
    const {id} = req.params;
    try {
        const doctor = await getDoctor(id);
        if (!doctor) throw new Error();
        res.status(200).send(doctor);
    } catch (error) {
        res.status(404).send("This doctor is not in Data Base")
    }
})

router.post("/", async (req, res) => {
    const {name, lastName, mail, password, birthdate, image, location, dni, phone, speciality, lisence, cv, clinicMail} = req.body;
    try {
        const doctor = await postDoctor(name, lastName, mail, password, birthdate, image, location, dni, phone, speciality, lisence, cv, clinicMail);
        if (!doctor) throw new Error();
        res.status(200).send(doctor);
    } catch (error) {
        res.status(400).send("The doctor was not created");
    }
})

router.put("/update/:id", async (req, res) => {
    const {id} = req.params;
    const values = req.body;
    try {
        const doctor = await putDoctor(id, values);
        res.status(200).send(doctor);
    } catch (error) {
        res.status(400).send("The doctor was not updated")
    }
})

module.exports = router;