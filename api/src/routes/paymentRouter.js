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
      success: "https://pf-grupo-2.vercel.app/HomeClient/Profile",
      // "https://pf-grupo-2.vercel.app/HomeClient/Profile"
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
    metadata: { planId: prod.id },
    external_reference: prod.patientIdLocal,

    notification_url: `https://pf-grupo-2-production.up.railway.app/payments/notificate`, //url a la que mercado pago nos va a notificar la compra
  };
  //`https://e738-152-170-158-127.sa.ngrok.io/payments/notificate`
  // https://pf-grupo-2-production.up.railway.app/payments/notificate

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
    const patientId = payment.body.external_reference;
    const planId = payment.body.additional_info.items[0].id;
    const parse2 = parseInt(planId);
    console.log(planId);
    console.log(parse2);
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
      patientPlan.availableConsultations =
        patientPlan.availableConsultations + 3;
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
          date.getFullYear() +
          "-" +
          (date.getMonth() + 1) +
          "-" +
          date.getDate(),
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

//Enviar correo electrónico al cliente con los detalles de la compra
const nodemailer = require('nodemailer');

// Configurar el transporter con los detalles de autenticación de tu proveedor de correo electrónico
const transporter = nodemailer.createTransport({
  port:465,
  host:'smtp.gmail.com',
  secure:true,
  auth: {
    user: 'icareh7@gmail.com',
    pass: 'xftqhjpgblkmnfno'
  }
});

// Obtener el correo electrónico del cliente
const patient = await Patient.findByPk(patientId);
const email = patient.mail;
console.log(email)

// Construir el mensaje HTML con los detalles de la compra
const htmlMessage = `<div style="border: 2px solid #ccc; padding: 20px;">
<h2 style="color: blue;">Thank you for your purchase on our site. Here are the details of your transaction:</h2>
<ul>
  <li>ID payment: ${paymentId}</li>
  <li>Service: ${plan.name}</li>
  <li>Price: $${plan.price}</li>
  <li>Plan duration: ${plan.durationMonths} meses</li>
</ul>
<h5>iCare</h5>
</div>`


// Enviar el correo electrónico al cliente
transporter.sendMail({
  from: 'icarehenrypf@gmail.com',
  to: email,
  subject: 'Detalles de la compra en MercadoPago',
  html: htmlMessage
}, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Correo electrónico enviado: ' + info.response);
  }
});




  }
  

  res.sendStatus(200);
});

module.exports = router;




