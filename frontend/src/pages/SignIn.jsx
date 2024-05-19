import React, { useState } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Avatar, Box, Button, Container, CssBaseline, Grid, Link, Paper, TextField, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

//const esquema = createTheme();



const SignIn = () => {
    const [correo,setCorreo] = useState('');
    const [clave,setClave] = useState('');
    //const [userPassword, setUserPassword] = useState('');
   
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
          email: data.get('email'),
          password: data.get('password'),
        });
        setCorreo(data.get('email'));
        //console.log(email);
        setClave(data.get('password'));
        //console.log(clave);
      };

      const datos ={
        email: correo,
        password: clave
      }

      
      axios
      .post(`http://localhost:5000/usuario/login`,datos)
      .then((response)=>{
        
        console.log(response);
        //navigate('/')
        
        
    })
  return (
    //<ThemeProvider theme={esquema}>
        <Grid align ='center'>
            <Paper elevation={15} sx={{
                padding:10,
                height:'100vh',
                width:500,
                margin:'20px auto',
                display:'flex',
                alignItems:'center',
                
            }}>
                <Box
                  
                >
                
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>

                    <Typography component='h1' variant='h4'>
                        Laboratorio Remoto U de A
                    </Typography>

                    <Box component='form' onSubmit={handleSubmit}  sx={{mt:1}}>
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
            </Paper>
        </Grid>
    //</ThemeProvider>
  )
}

export default SignIn