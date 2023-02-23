// class PaymentController{
//     constructor(subscriptionService){
//         this.subscriptionService=subscriptionService;
//     }

//     async getSubscriptionLink(req,res){
//         try {
//             const subscription = await this.subscriptionService.createSubscription()

//             return res.json(subscription);
//         } catch (error) {
//             return res.status(500).json({error:error.message})
//         }
//     }

// }


// module.exports= PaymentController;