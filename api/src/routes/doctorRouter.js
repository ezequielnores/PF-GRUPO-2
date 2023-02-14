const { Router } = require("express");
const { getDoctors, getDoctor } = require("../controllers/doctorController");

const router = Router()


router.get("/", (req, res) => {
    const {name} = req.query;
    try {
        const doctors = getDoctors(name);
        if (!doctors) throw new Error();
        res.status(200).send(doctors);
    } catch (error) {
        res.status(404).send("There are no doctors in Data Base")
    }
});


router.get("/:id", (req, res) => {
    const {id} = req.params;
    try {
        const doctor = getDoctor(id);
        if (!doctor) throw new Error();
        res.status(200).send(doctor);
    } catch (error) {
        res.status(404).send("This doctor is not in Data Base")
    }
})