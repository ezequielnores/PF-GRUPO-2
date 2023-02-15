// import { useState } from "react";
// import style from "./Form.module.css"
// import { postRecipe,getDiets, getRecipes } from "../../redux/actions";
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect } from "react";


// export const validate=(form)=>{
//     let errors={};
//     if(form.name === ""){
//         errors.name = "Name required!";   

//     } else if(form.name.length < 3) {
//         errors.name = 'Minimum 3 letters'

//     } else if(!form.summary){
//         errors.summary= "summary must be complete";

//     } else if(form.summary.length < 20){
//         errors.summary = 'Minimum 20 letters';

//     }else if(form.healthScore < 0 || form.healthScore> 100 ){
//         errors.healthScore = 'Maximum up to 100'

//     }else if(!form.steps){
//         errors.steps = "required field"
//     }
//     // }else if(input.type.length !== input.type.length){
//     //     errors.type= "it has to be a different diet"
//     // }
   
//         return errors;
//   }




// const Form= ()=>{

//     const dispatch=useDispatch();

//     const diet=useSelector(state=>state.diets)

//     const [form,setForm]=useState({ // Creo un estado con los datos de mis inputs, el formulario debe ser un reflejo del estado, el formulario tiene 
//         name:"",                     //que mostrar si o si lo que esté en el estado, para eso pongo el value en los inputs, con esto hacemos que tenga si o si
//         summary:"",                   //lo que tenga adentro el estado, entonces lo que yo escriba ahora en mi estado se verá reflejado en mis inputs
//         healthScore:"",              // pero si quiero escribir en mi formulario no voy a poder, para hacer eso tengo que ejecutar una funcion para que
//         steps:"",                    // cuando yo escriba en el formulario esta se ejecute y TAMBIEN cambie mi estado, con esto tendremos el formulario controlado.
//         diets:[],
//     })

//     const [errors, setErrors]=useState({
//         name:"",
//         summary:"",
//         healthScore:"",
//         steps:"",
//     })


    

//     const changeHandler=(event)=>{
//         const property=event.target.name;
//         const value=event.target.value;

//        setErrors(validate({...form,[property]:value})); //le doy lo mismo que set form para que no haya delay al momento de validar mi input
//         setForm({...form,[property]:value})
        
//     }

//     const handleSelect=(e)=>{
//         if(form.diets.includes(e.target.value)){
//             console.log("YA EXISTE")
//             return "Diet type already exists"
            
//         }else{
//             setForm({
//                 ...form,
//                 diets:[...form.diets,e.target.value]
//             })
//         }
//     }

//     const submitHandler=(event)=>{
//          event.preventDefault();
//          dispatch(postRecipe(form))
//          .then(alert("The recipe has been created successfully"))
//          .then(setForm({
//             name:"",
//             summary:"",
//             healthScore:"",
//             steps:"",
//             diets:[]
//         }))
//         .then(dispatch(getRecipes()))
//          .catch(err=>console.log(err))
//     }

//     const handleDelete=(e)=>{
//         setForm({
//             ...form,diets:form.diets.filter(d=>d!==e)
//         })
//     }

   

//     useEffect(()=>{
//         dispatch(getDiets())
//     },[dispatch])
    
//         return(

//         <div className={style.div}>
            
//             <form onSubmit={submitHandler} className={style.divForm}> 
//                     <h3 className={style.nombre}>Enjoy creating your own recipe!</h3>
//                 <div>
//                     <label className={style.label}>Recipe name:</label>
//                     <input type="text" value={form.name} onChange={changeHandler} name="name" className={style.input} required></input>
//                     {errors.name && <span>{errors.name}</span>}
//                 </div>

//                 <div>
//                     <label className={style.label}>Summary:</label>
//                     <input type="text" value={form.summary} onChange={changeHandler} name="summary" placeholder="Your recipe summary" className={style.input} ></input>
//                     {errors.summary && <span>{errors.summary}</span>}
//                 </div>

//                 <div>
//                     <label className={style.label}>HealthScore:</label>
//                     <input type="number" value={form.healthScore} onChange={changeHandler} name="healthScore" placeholder="1-100" className={style.input} ></input>
//                     {errors.healthScore && <span>{errors.healthScore}</span>}
//                 </div>

//                 <div className={style.step}>
//                     <label className={style.label}>Steps:</label>
//                     {/* <input ></input> */}
//                     <textarea type="textarea" value={form.steps} onChange={changeHandler} name="steps" placeholder="Step by step" className={style.textarea} ></textarea>
//                     {errors.steps && <span>{errors.steps}</span>}
//                 </div>

//                 <div  >
//                     <select onChange={handleSelect} className={style.diet}>
//                     <option value={form.diets} name="diets">Diet type</option>
//                     {diet?.map(c=>{
//                         return(
//                             <option value={c.name}>{c.name}</option>
//                         )
//                         })}
//                     </select>
//                 </div>
            
//                     {(!form.name || !form.summary || !form.healthScore || !form.steps || !form.diets.length || errors.summary || errors.name || errors.steps || errors.healthScore) ? 
//                     <button disabled="disabled" className={style.disabled}>CREATE</button>
//                     :
//                     <button type="submit" className={style.submit}>CREATE</button>}
                 
                    
//             </form>


//             <div className={style.dietas}>
//                 {form.diets.map(el=>
//                     <div >
            
//                     <button onClick={()=>handleDelete(el)} className={style.x} >X</button>
//                     <p className={style.nombre}>Tipo de dieta: {el}</p>
//                     </div> 
//                 )}
//            </div>
//         </div>
        

//     )
// }

// export default Form;