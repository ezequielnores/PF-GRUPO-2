const { Router } = require("express");
const axios = require("axios");
const router = Router();
const { PatientPlan, Patient, Plans } = require("../db");

router.post("/producto", async (req, res) => {
  const prod = req.body;
  const patient = await Patient.findByPk(parseInt(prod.patientIdLocal));
  let preference = {
    back_urls: {
      //serán las URLS a las cuales puede redirigirnos luego de la compra
      success: "http://localhost:3000/HomeClient/Profile",
      failure: "",
      pending: "", //si tengo que hacer un pago en efectivo, queda pendiente
    },
    binary_mode: true, //que solo se ´pueda hacer pago con tarjeta, no en efectivo
    items: [
      //será toda la info del producto o servicio a vender
      {
        id: prod.id,
        title: prod.title,
        unit_price: parseInt(prod.price),
        quantity: 1,
        currency_id: "ARS",
        picture_url: prod.image,
        description: prod.description,
        category_id: "art",
      },
    ],
    payer: {
      name: patient.name,
      surname: patient.surname,
      email: patient.mail,
    },
    external_reference: { patientId: prod.patientIdLocal, planId: prod.id },
    notification_url: `https://webhook.site/f5cab02d-c79d-4def-ae6a-2c3d28a3e67a`, //url a la que mercado pago nos va a notificar la compra
  };

  mercadopago.preferences
    .create(preference)
    .then((response) => res.status(200).send({ response }))
    .catch((error) => res.status(400).send({ error: error.message }));
});

router.post("/notificate", async (req, res) => {
  const { query } = req;

  const topic = query.topic;

  if (topic === "payment") {
    const paymentId = query.id;
    const payment = await mercadopago.payment.findById(paymentId);
    const { patientId, planId } = payment.body.external_reference;
    const plan = await Plans.findByPk(planId);
    const date = new Date();
    const patientPlan = PatientPlan.create({
      name: plan.name,
      price: plan.price,
      durationMonths: plan.durationMonths,
      availableColsultations: 3,
      expires:
        date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
      patientId: patientId,
    });
    // const patient = await Patient.findByPk(patientId);
    // console.log(patient);
    // if (patient) {
    //   patient.plan = payment.body.description;
    //   await patient.save();
    // }
  }

  res.sendStatus(200);
});

module.exports = router
