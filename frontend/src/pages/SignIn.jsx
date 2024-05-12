import React, { useState } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Avatar, Box, Button, Container, CssBaseline, Grid, Link, TextField, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const esquema = createTheme();



const SignIn = () => {
    const [correo,setCorreo] = useState('');
    const [clave,setClave] = useState('')
   
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
          email: data.get('email'),
          password: data.get('password'),
        });
        setCorreo(data.get('email'));
        console.log(email);
        setClave(data.get('password'));
        console.log(clave);
      };

     

      axios
      .get(`http://localhost:5000/usuario/${correo}`)
      .then((response)=>{
        console.log(response);

    })
  return (
    <ThemeProvider theme={esquema}>
        <Container >
            <CssBaseline />
                <Box 
                   sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    alignContent:'center'
                  }}
                >
                
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>

                    <Typography component='h1' variant='h4'>
                        Laboratorio Remoto U de A
                    </Typography>

                    <Box component='form' onSubmit={handleSubmit} noValidate sx={{mt:1}}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        />

                    <Button
                        type='submit'
                        fullWidth
                        variant='contained'
                        sx={{
                            mt:3,
                            mb:2
                        }}
                    >
                        Ingresar
                    </Button>


                    <Grid container>
                        <Grid item xs>
                            <Link href = "#" variant='body2'>
                                Olvidaste tu contraseña?
                            </Link>
                        </Grid>
                    </Grid> 
                    </Box>
                </Box>
        </Container>
    </ThemeProvider>
  )
}

export default SignIn