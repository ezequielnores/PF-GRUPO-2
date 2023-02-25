// const { Router } = require("express");
// const {mercadopago} =require ("../utils/mercadoPago");


// const producto={
//         id:123456,
//         title:"zapatilla",
//         unit_price:150
//     }//este producto seria el que tengo en la base de datos

//     const router = Router();

//     router.post("/", (req,res)=>{
//         // Crea un objeto de preferencia
//         const usuarioId=req.query.usuarioId
//         let preference = {
    
//             back_urls:{
//                 success: "http://localhost:3001/success",
//                 // failure: "http://localhost:3001/success",
//                 // pending: "http://localhost:3001/success",
    
//             },
//             items: [
//               {
//                 id:producto.id,
//                 title: producto.id,
//                 unit_price: producto.unit_price,
//                 quantity: 1,
//                 currency_id: "ARS",
//               },
//             ],
//             // notification_url: `https://5606-152-170-158-127.sa.ngrok.io/notificate/${usuarioId}/${producto.id}`   //url a la que mercado pago nos va a notificar la compra
//           };
          
//           mercadopago.preferences
//             .create(preference)
//             .then(function (response) {
//                 console.log(response.body.init_point)
//                 res.send(`<a href="${response.body.init_point}">IRA PAGAR</a>`)
//               // En esta instancia deberás asignar el valor dentro de response.body.id por el ID de preferencia solicitado en el siguiente paso
//             })
//             .catch(function (error) {
//               console.log(error);
//             });
//     });
  



