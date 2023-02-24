import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {plansGetAll} from "../../../redux/reducers/plansReducer";
import { padreTarjeta } from "./planess"


const Suscriptions = () => {
    const dispatch=useDispatch();
    const plans = useSelector(state => state.plans.listAll);
    const patientIdLocal = localStorage.getItem("id");

    useEffect(() => {
        dispatch(plansGetAll());
    }, [])
    console.log(plans)

    // const plans = [
    //     {
    //         id: 1,
    //         name: "Plan 1",
    //         price: 2000,
    //         durationMonths: 1,
    //         state:true,
    //         detail:"el detalle del plan 1"
    //     },
    //     {
    //         id: 2,
    //         name: "Plan 2",
    //         price: 3000,
    //         durationMonths: 1,
    //         state:true,
    //         detail:"el detalle del plan 2"
    //     },
    //     {
    //         id: 3,
    //         name: "Plan 3",
    //         price: 4000,
    //         durationMonths: 1,
    //         state:true,
    //         detail:"el detalle del plan 3"
    //     }
    // ]
    const hijoTarjeta = {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        height: "30rem",
      };
      const tarjetitas = {
        width: "22rem",
        height: "20rem",
        boxShadow: "box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2)",
      };
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
                        <button onClick={()=>{
                        axios.post("http://localhost:3001/producto",{title:plan.name,price:plan.price,description:plan.detail,patientIdLocal})
                        .then((res)=>window.location.href=res.data.response.body.init_point) //ruta que me lleva al pago del producto
                             }}>Comprar</button>
                    </div>
                )
            })}

        

        </div>

    </div>




)
}
export default Suscriptions;

// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import axios from 'axios';
// import { plansGetAll } from '../../../redux/reducers/plansReducer';
// import { Card, CardContent, CardActions, Button, Typography, Grid, makeStyles } from '@material-ui/core';
// import { Link } from 'react-router-dom';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     paddingTop: theme.spacing(4),
//     paddingBottom: theme.spacing(4),
//     backgroundColor: '#f5f5f5',
//   },
//   title: {
//     marginBottom: theme.spacing(2),
//     fontWeight: 'bold',
//     color: '#333333',
//     textAlign: 'center',
//   },
//   cardContainer: {
//     marginTop: theme.spacing(4),
//   },
//   card: {
//     width: '100%',
//     height: '100%',
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'space-between',
//     boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
//     borderRadius: 8,
//     overflow: 'hidden',
//     backgroundColor: '#ffffff',
//   },
//   cardContent: {
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'center',
//     alignItems: 'center',
//     flexGrow: 1,
//     padding: theme.spacing(2),
//   },
//   cardActions: {
//     display: 'flex',
//     justifyContent: 'center',
//     marginBottom: theme.spacing(2),
//   },
//   buyButton: {
//     backgroundColor: '#1976d2',
//     color: '#ffffff',
//     '&:hover': {
//       backgroundColor: '#115293',
//     },
//   },
// }));

// const Suscriptions = () => {
//   const classes = useStyles();
//   const dispatch = useDispatch();
//   const plans = useSelector((state) => state.plans.listAll);
//   const patientIdLocal = localStorage.getItem('id');
//   const [page, setPage] = useState(1);

//   useEffect(() => {
//     dispatch(plansGetAll());
//   }, []);

//   const handleBuyPlan = (plan) => {
//     axios
//       .post('http://localhost:3001/producto', { title: plan.name, price: plan.price, description: plan.detail, patientIdLocal })
//       .then((res) => (window.location.href = res.data.response.body.init_point)); //ruta que me lleva al pago del producto
//   };

//   const renderPlanCard = (plan) => {
//     return (
//       <Grid item xs={12} sm={6} md={4} key={plan.id}>
//         <Card className={classes.card}>
//           <CardContent className={classes.cardContent}>
//             <Typography variant="h6" gutterBottom>
//               {plan.name}
//             </Typography>
//             <Typography variant="subtitle1" color="textSecondary" gutterBottom>
//               {plan.detail}
//             </Typography>
//             <Typography variant="h5" color="textPrimary" gutterBottom>
//               {plan.price} USD
//             </Typography>
//             <Typography variant="subtitle2" color="textSecondary" gutterBottom>
//               {plan.durationMonths} months
//             </Typography>
//           </CardContent>
//           <CardActions className={classes.cardActions}>
//             <Button className={classes.buyButton} variant="contained" color="primary" onClick={() => handleBuyPlan(plan)}>
//               Buy Now
//             </Button>
//           </CardActions>
//         </Card>
//         </Grid>)
//   }
// }

// export default Suscriptions;

