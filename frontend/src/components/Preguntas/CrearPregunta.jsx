import { Grid, Paper } from '@mui/material';
import React, { useState } from 'react'

const CrearPregunta = () => {

    const [pregunta,setPregunta] = useState('');
    const [respuestaUno, setRespuestaUno] = useState('')
    const [respuestaDos, setRespuestaDos] = useState('')
    const [respuestaTres, setRespuestaTres] = useState('')
    const [respuestaCuatro, setRespuestaCuatro] = useState('')
  return (
    <Grid align = 'center'>
        <Paper elevation={10} sx={{
                padding:10,
                height:'100vh',
                width:600,
                margin:'20px auto',
                display:'flex',
                alignItems:'center',}}>
            <h1>Hola Pregunta</h1>
        </Paper>
    </Grid>
  )
}

export default CrearPregunta