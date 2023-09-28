import React, {useEffect, useState} from 'react'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { OptionsToString } from '../utils/Utils';


//let filteredData = [];

export default function TableCustom(props) {
let optionsListed = "";

const [filteredData, setFilteredData] = useState([])

const navigate = useNavigate()

  useEffect(() => {
    console.log("useEffect TableCUstom")
    console.log(props.filter)
    console.log(props.data)
    console.log(props.data.filter((item) => item.color["id"] == props.filter))
    
    let filteredDataBis = props.data.filter((item) => props.filter == "all" || (item.color["id"] == props.filter) )
    setFilteredData(filteredDataBis)

  }, [props.filter])

  return (
    <div id='lodging-list'>
      <TableContainer component={Paper}>
            <Table sx={{ minWidth: 150 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Nom du Logement</TableCell>
                  <TableCell align="right">Type</TableCell>
                  <TableCell align="right">Couleur</TableCell>
                  <TableCell align="right">Options</TableCell>
                  <TableCell align="right">Disponible</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData.map((row) => (
                  
                 
                      <TableRow
                        key={row.name}
                        className='table-elem'
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        onClick={() => {
                            console.log("CLicked on " + row.name);
                            navigate(`lodging/${row.id}`, {"id": row.id,})
                          }
                        }
                        >
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell align="right">T1</TableCell>
                        <TableCell align="right"><div className={`color-block`} style={{backgroundColor:row.color["hex"]}} ></div></TableCell>
                        <TableCell align="right">{OptionsToString(row.options)}</TableCell>
                        <TableCell align="right">Oui</TableCell>
                      </TableRow>
                
                      
                 
                ))}
              </TableBody>
            </Table>
          </TableContainer>
    </div>
   
  )
}
