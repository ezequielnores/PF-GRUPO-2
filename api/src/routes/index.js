const { Router } = require("express");
const { mercadopago } = require("../utils/mercadoPago");
const { Patient, Plans } = require("../db");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const turnsRouter = require("../routes/turnsRouter");

const planRouter = require("./plans.js");

const patientRouter = require("./patientRouter");

const medicalHistoryRouter = require("./medicalHistoryRouter");

const doctorRouter = require("./doctorRouter");

const frequentQuestionsRouter = require("./frequentQuestionsRouter");

const incomesRouter = require("./incomesRouter");

const commentsRouter = require("./commentsRouter");

const adminRouter = require("./adminRouter");

const blogRouter = require("./blogRouter");

const urgencyRouter = require("./urgencyRouter");

const paymentRouter = require("./paymentRouter");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/turns", turnsRouter);

router.use("/plans", planRouter);

router.use("/doctor", doctorRouter);

router.use("/patient", patientRouter);

router.use("/medicalHistory", medicalHistoryRouter);

router.use("/frequentQuestions", frequentQuestionsRouter);

router.use("/incomes", incomesRouter);

router.use("/comments", commentsRouter);

router.use("/admins", adminRouter);

router.use("/urgency", urgencyRouter);

router.use("/blog", blogRouter);

router.use("/payments", paymentRouter);

////////////////////RUTA PARA PAGO UNICO/////////////////////////

//En la merchant_order tenemos el status (closed si se completó), array de payments allí se encuentra los pagos asociados a esa orden, payments.status diria approved, la fecha en la que se aprobó..tambien hay otra propiedad order_status: approved

//////////////////////////PRUEBA IMPLEMENTANDO ID DE CADA PRODUCTO///////////////

// router.get("/producto:id", async (req,res)=>{
//     const idPatient=req.body;
//     const {id}=req.params;
//     const producto= await Plans.findById(id);
//     const payer= await Patient.findById(idPatient);
//     let preference = {

//         back_urls:{ //serán las URLS a las cuales puede redirigirnos luego de la compra
//             success: "http://localhost:3000",
//             failure: "",
//             pending: "", //si tengo que hacer un pago en efectivo, queda pendiente
//         },
//         binary_mode:true, //que solo se ´pueda hacer pago con tarjeta, no en efectivo
//         payer:{
//             name:payer.name,
//             surname:payer.surname,
//             email:payer.mail

//         },
//         items: [  //será toda la info del producto o servicio a vender
//           {
//             id:producto.id,
//             title: producto.name,
//             unit_price: producto.price,
//             quantity: 1,
//             currency_id: "ARS",
//             description:producto.detail,
//             category_id:"art",

//           },
//         ],
//         // notification_url: `https://5606-152-170-158-127.sa.ngrok.io/notificate`   //url a la que mercado pago nos va a notificar la compra
//       };

//       mercadopago.preferences.create(preference)
//       .then((response)=>res.status(200).send({response}))
//       .catch((error)=>res.status(400).send({error:error.message}))

// });

// router.get('/preapproval', (req, res) => {
//     const url = 'https://api.mercadopago.com/preapproval?access_token=APP_USR-1603926138292006-022312-1bca62292458e611b39c481d80a84dbf-1315962785';
//     const options = {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'X-scope': 'stage'
//       },
//       body: JSON.stringify({
//         back_url: 'https://www.google.com',
//         reason: 'Test Subscription',
//         auto_recurring: {
//           frequency: 1,
//           frequency_type: 'months',
//         //   start_date: '2023-06-02T13:07:14.260Z',
//         //   end_date: '2023-07-20T15:59:52.581Z',
//           transaction_amount: 10,
//           currency_id: 'ARS'
//         },
//         payer_email: 'test_user_1315963786@testuser.com',
//         // card_token_id: '{{EL_CARD_TOKEN_QUE_CREASTE}}',
//         status: 'authorized'
//       })
//     };

//     fetch(url, options)
//       .then(response => {
//         // handle the response
//         console.log(response)
//         res.json(response);
//         return response.data
//       })
//       .catch(error => {
//         // handle errors
//         res.status(500).json({ error: error.message });
//       });
//   });

// const producto={
//     id:123456,
//     title:"zapatilla",
//     unit_price:150
// }//este producto seria el que tengo en la base de datos

// router.use("/generate", (req,res)=>{
//     // Crea un objeto de preferencia
//     const usuarioId=req.query.usuarioId
// let preference = {

//     back_urls:{
//         success: "http://localhost:3001/success",
//         // failure: "http://localhost:3001/success",
//         // pending: "http://localhost:3001/success",

//     },
//     items: [
//       {
//         id:producto.id,
//         title: producto.id,
//         unit_price: producto.unit_price,
//         quantity: 1,
//         currency_id: "ARS",
//       },
//     ],
//     notification_url: `https://5606-152-170-158-127.sa.ngrok.io/notificate/${usuarioId}/${producto.id}`   //url a la que mercado pago nos va a notificar la compra
//   };

//       mercadopago.preferences
//         .create(preference)
//         .then(function (response) {
//             console.log(response.body.init_point)
//             res.send(`<a href="${response.body.init_point}">IRA PAGAR</a>`)
//           // En esta instancia deberás asignar el valor dentro de response.body.id por el ID de preferencia solicitado en el siguiente paso
//         })
//         .catch(function (error) {
//           console.log(error);
//         });
// });

// router.use("/success", (req,res)=>{
//     res.send("TODO SALIO BIEN")

// })
// router.use("/notificate/:usuarioId/:productoId", async (req,res)=>{
//     const {query}=req;
//     console.log({query})
//     const topic= query.topic;

//     switch(topic){
//         case "payment":
//             const paymentId=query.id;
//            const payment=await mercadopago.payment.findById(paymentId);
//             merchantOrder=await mercadopago.merchant_orders.findById(payment.body.order.id); //tendrá toda la info de todos los pagos actualizados
//             break;
//         case "merchant order":
//             const orderId=query.id;
//             merchantOrder = await mercadopago.merchant_orders.findById(orderId);
//             break;
//     }

//     var paidAmount=0;
//     merchantOrder.body.payments.forEach(payment=>{
//         if(payment.status==="approved"){
//             paidAmount+=payment.transaction_amount;
//         }
//     });

//         if(paidAmount>=merchantOrder.body.transaction_amount){
//             console.log("El pago se concretó")
//             // informarUsuario(params.usuarioId).getComproElProducto(params.productoId) puedo informar al ususario que la compra fue exitosa
//         }else{
//             console.log("el pago no se concretó")
//         }
//     res.send()

// })

module.exports = router;
