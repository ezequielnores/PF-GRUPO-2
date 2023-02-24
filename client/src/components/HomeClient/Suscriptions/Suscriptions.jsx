import React, { useState } from 'react';
const Suscriptions = () => {

    const plans = [
        {
            id: 1,
            name: "Plan 1",
            price: 2000,
            durationMonths: 1,
            state:true,
            detail:"el detalle del plan 1"
        },
        {
            id: 2,
            name: "Plan 2",
            price: 3000,
            durationMonths: 1,
            state:true,
            detail:"el detalle del plan 2"
        },
        {
            id: 3,
            name: "Plan 3",
            price: 4000,
            durationMonths: 1,
            state:true,
            detail:"el detalle del plan 3"
        }
    ]
    const pages = Math.ceil(plans.length/3)
    const [page , setPage] = useState(1)

return(
    <div style={{display:"flex",flexDirection:"column", justifyContent:"center",width:"80vw",marginLeft:"8vw"}}>
        <h1>Suscriptions</h1>
        <div style={{display:"flex",justifyContent:"space-around",width:"90%"}}>
            {plans.slice((page-1)*3 ,(page*3)).map(plan => {
                return(
                    <div 
                        style={{width:"15vw",
                        border:"solid 1vh #43B8C8",
                        height:"50vh",
                        borderRadius:"2vw",
                        display:"flex",
                        flexDirection:"column",
                        justifyContent:"space-around",
                        }}>
                        <h2>{plan.name}</h2>
                        <p>{plan.price}</p>
                        <p>{plan.durationMonths}</p>
                        <p>{plan.detail}</p>
                        <button>Comprar</button>
                    </div>
                )
            })}

        

        </div>

    </div>
)
}
export default Suscriptions;