import express from 'express';
import bcrypt from 'bcrypt';
import { Usuario } from './models/userModel.js';

const router = express.Router();

router.post('/login',async (request,response)=>{
    const {email,password} = request.body;
    const usuario = await Usuario.findOne({email});
    if(!usuario){
        return response.json({message:'Usuario no está registrado.'});
    }

    const validPassword = await bcrypt.compare(password,usuario.password);

    if(!validPassword){
        return response.json({message: 'Password incorrecto'});
    }else{
        return response.json({message: 'Logueado con éxito'});
    }
});

export {router as LoginRoute};