import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import RowsFaq from './RowsFaq';
import style from './Faq.module.css';
import Button from '@mui/material/Button';
const Faq = () => {
    const faqRedux = [
        {
            id: 1,
            question: "¿Qué es la telemedicina?",
            answer: "La telemedicina es la utilización de las tecnologías de la información y la comunicación para la prestación de servicios de salud a distancia. La telemedicina permite que los profesionales de la salud brinden atención médica a distancia, utilizando medios de comunicación como teléfonos, computadoras, televisión y otros dispositivos electrónicos. La telemedicina permite que los profesionales de la salud brinden atención médica a distancia, utilizando medios de comunicación como teléfonos, computadoras, televisión y otros dispositivos electrónicos."
        },
        {
            id: 2,
            question: "¿Qué es una operacion?",
            answer:"una operacion es una intervencion quirurgica, que se realiza para corregir una enfermedad o una deformidad, o para extirpar un tumor. La operacion es una intervencion quirurgica, que se realiza para corregir una enfermedad o una deformidad, o para extirpar un tumor."
        },
        {
            id: 3,
            question:"¿Como puedo pedir turno?",
            answer:"Para pedir turno, debes ingresar a la pagina web, y registrarte como usuario, dirigirte a la seccion de turnos, y seleccionar el medico que quieras, y la fecha y hora que quieras."
        },
        {
            id: 4,
            question:"Necesito un medico urgente, ¿como puedo conseguirlo?",
            answer:"Para conseguir un medico urgente, debes ingresar a la pagina web, y registrarte como usuario, dirigirte a la seccion de urgencias, completar el formulario, y esperar a que un medico se ponga en contacto con vos."
        },
        ]


    const [page, setPage] = React.useState(0);
    const [search, setSearch] = React.useState("");

    const faq = faqRedux;


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeSearch = (e) => {
        setSearch(e.target.value);
    };

    const handleSearch = () => {
        console.log(search)
    }


    return (
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"space-between",padding:"0 2vw 0 5vw",width:"90vw",gap:"2vh"}}>

            <h2 style={{fontSize:"2vw"}}>Frequently Asked Questions</h2>
            <div>

                <div style={{border:"1px solid  rgba(131, 130, 130, 0.7)",borderRadius:"15px",height:"8vh",width:"40vw",display:"flex"}}>     
                    <div className={style.divSearch} >
                        <label className={style.labelSearch}>Search Question</label>
                        <input
                            value={search}
                            onChange={handleChangeSearch}  
                            className={style.inputSearch}
                            />
                    </div>
                    <button type="button" onClick={handleSearch} className={style.buttonSearch} >Search</button>
                </div>
                
            </div>
            <div style={{width:"100%",display:"flex",justifyContent:"flex-start"}}>
                <TableContainer component={Paper} sx={{width:7/8}} >
                            <Table aria-label="collapsible table">
                                <TableBody>
                                {faq[0]?
                                    
                                faq.slice(page*4,(page*4)+4).map((f) => (
                                <RowsFaq key={f.id} question={f.question} answer={f.answer}/>
                                ))
                                :
                                <TableRow>
                                    <TableCell>No Question</TableCell>
                                </TableRow>

                                }
                                </TableBody>
                            </Table>
                            <TablePagination
                                    component="div"
                                    count={faq.length}
                                    rowsPerPage= {4}
                                    page={page}
                                    labelRowsPerPage = {""}
                                    rowsPerPageOptions = {""}
                                    onPageChange={handleChangePage}
                            />
                </TableContainer>
            </div>
        </div>
    )
}
export default Faq;