import React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';


const RowsFaq = ({ question,answer}) => {
    const [open, setOpen] = React.useState(false);
    return(
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' }, display:"flex",justifyContent:"flex-start" }}>
                <TableCell>
                <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={() => setOpen(!open)}
                >
                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
                </TableCell>

                <TableCell align="right" sx={{fontSize:15}}>{question}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box sx={{ margin: 1 }}>
                    <Table size="small" aria-label="purchases">
                        <TableHead>
                        <TableRow>
                            <TableCell><div style={{display:"flex",flexDirection:"row",justifyContent:"space-around"}}>
                                    <div style={{display:"flex",gap:"0.2rem"}}>
                                        <p>{answer}</p>
                                    </div>
                                </div>
                            </TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        </TableBody>
                    </Table>
                    </Box>
                </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    )
}

export default RowsFaq;