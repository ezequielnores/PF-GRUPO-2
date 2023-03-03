const { Router } = require("express");
const axios = require("axios");
const router = Router();
const nodemailer = require('nodemailer');

router.post("/", async (req,res)=>{

    const {mail,link}=req.body;
console.log(mail)
console.log(link)
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
      
      // Construir el mensaje HTML con los detalles de la compra
      const htmlMessage = `<div style="border: 2px solid #ccc; padding: 20px;">
      <h2 style="color: blue;">The doctor has invited you to a meeting, here is the link to the appointment: </h2>
        <p> ${link}</p>
      <h5>iCare team</h5>
      </div>`
      
      
      // Enviar el correo electrónico al cliente
      transporter.sendMail({
        from: 'icarehenrypf@gmail.com',
        to: mail,
        subject: 'Detalles de su atencion médica',
        html: htmlMessage
      }, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Correo electrónico enviado: ' + info.response);
        }
      });
    
        res.sendStatus(200);


})

module.exports = router;