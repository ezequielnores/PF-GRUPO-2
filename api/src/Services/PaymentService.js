// const axios =require ("axios")


// class PaymentService{
//     async createSubscription(){
//         const url='https://api.mercadopago.com/preapproval';

//         const body={
//             reason: "Medic plan",
//             auto_recurring:{
//                 frequency:1,
//                 frequency_type: "months",
//                 transaction_amount: 10,
//                 currency_id: "ARS"
//             },
//             back_url: "https://localhost:3001",
//             payer_email: "test_user_1315963786@testuser.com",
//             status: "authorized"
//         }

//         const subscription = await axios.post(url,body,{
//             headers:{
//                 "Content-Type": "application/json",
//                 Authorization: "Bearer APP_USR-8663621775942378-022217-29826606e7035036f56a1ecf6414de01-1315962785"
//             }
//         });


//         return subscription.data;
	
//     }
// }

// module.exports=PaymentService

