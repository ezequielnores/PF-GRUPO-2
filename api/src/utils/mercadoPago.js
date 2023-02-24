
// SDK de Mercado Pago
require("dotenv").config;
const mercadopago = require("mercadopago");
const { ACCESS_TOKEN } = process.env;

// Agrega credenciales
mercadopago.configure({
  access_token: "APP_USR-8663621775942378-022217-29826606e7035036f56a1ecf6414de01-1315962785",
});
// APP_USR-8663621775942378-022217-29826606e7035036f56a1ecf6414de01-1315962785   token de chekout pro
module.exports={
    mercadopago
}




  