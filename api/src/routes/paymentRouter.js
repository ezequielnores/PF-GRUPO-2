const { Router } = require("express");
const axios = require("axios");
const router = Router();
const { PatientPlan, Patient, Plans } = require("../db");
const { mercadopago } = require("../utils/mercadoPago");

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
        id: parseInt(prod.planId),
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
    metadata:{planId:prod.id},
    external_reference:prod.patientIdLocal, 
   
    notification_url: `https://96cd-152-170-158-127.sa.ngrok.io/payments/notificate`, //url a la que mercado pago nos va a notificar la compra
  
  };

  mercadopago.preferences
    .create(preference)
    .then((response) => res.status(200).send({ response}))
    .catch((error) => res.status(400).send({ error: error.message }));
});

router.post("/notificate", async (req, res) => {
  const { query } = req;

  const topic = query.topic;
  if (topic === "payment") {
    const paymentId = query.id;
    const payment = await mercadopago.payment.findById(paymentId);
    const patientId = payment.body.external_reference;
    const planId=payment.body.additional_info.items[0].id;
    const parse2=parseInt(planId)
console.log(planId);
console.log(parse2)
    // const planId=1;
    const plan = await Plans.findByPk(parse2);
    const date = new Date();
    const patientPlan = await PatientPlan.findOne({
      where: {
        PatientId: patientId,
      },
    });
    
    if (patientPlan) {
      patientPlan.name = plan.name;
      patientPlan.price = plan.price;
      patientPlan.durationMonths = plan.durationMonths;
      patientPlan.availableConsultations = patientPlan.availableConsultations + 3;
      patientPlan.expires = new Date();
      await patientPlan.save();
    } else {
      const date = new Date();
      const newPatientPlan = PatientPlan.create({
        name: plan.name,
        price: plan.price,
        durationMonths: plan.durationMonths,
        availableConsultations: 3,
        expires:
          date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
        PatientId: patientId,
      });
    }
    






    // const patientPlan = PatientPlan.create({
    //   name: plan.name,
    //   price: plan.price,
    //   durationMonths: plan.durationMonths,
    //   availableConsultations: 3,
    //   expires:
    //     date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
    //   PatientId: patientId,
    // });
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
