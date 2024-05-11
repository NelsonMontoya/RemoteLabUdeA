import express from 'express';
import { PORT, MONGO_DB_URL } from './config.js';
import mongoose from 'mongoose';
import { Question } from './models/questionModel.js';
import { Usuario } from './models/userModel.js';



const app = express();

app.use(express.json());

//Routes

app.get('/',(request,response)=>{
    console.log(response);
    return response.status(234).send('Welcome to MERN Stack');
});

//Root for creating a Question

app.post('/question',async(request,response)=>{
    try {
        if(
            !request.body.question ||
            !request.body.optionOne ||
            !request.body.optionTwo ||
            !request.body.optionThree ||
            !request.body.optionFour ||
            !request.body.correctOption ||
            !request.body.questionType
        ){
            return response.status(400).send({
                message: 'Send all the required fields.'
            })
        }

        const newQuestion={
            question: request.body.question,
            optionOne: request.body.optionOne,
            optionTwo: request.body.optionTwo,
            optionThree: request.body.optionThree,
            optionFour: request.body.optionFour,
            correctOption: request.body.correctOption,
            questionType: request.body.questionType

        }
        

        const question  = await Question.create(newQuestion);
        return response.status(201).send(question);


    } catch (error) {
        console.log(error);   
        return response.status(500).send({message: error.message});     
    }
});


//Obtain the questions

app.get('/question',async (request,response)=>{
    try {
        const questions = await Question.find({});
        return response.status(200).json({
            count: questions.length,
            data: questions
        })
        
    } catch (error) {
        console.log(error);   
        return response.status(500).send({message: error.message}); 
    }
});

//Obtain the questions by id

app.get('/question/:id',async (request,response)=>{
    try {

        const {id} = request.params;
        const question = await Question.findById(id);
        return response.status(200).json(question)
        
    } catch (error) {
        console.log(error);   
        return response.status(500).send({message: error.message}); 
    }
});

//Create a user
app.post('/usuario',async (request,response)=>{
    try {
        if(
            !request.body.name ||
            !request.body.username ||
            !request.body.password
        ){
            return response.status(400).send({
                message: 'Send all the required fields.'
            })
        }

        const newUser={
            name: request.body.name,
            username: request.body.username,
            password: request.body.password

        }
        

        const usuario  = await Usuario.create(newUser);
        return response.status(201).send(usuario);

        
    } catch (error) {
        console.log(error);   
        return response.status(500).send({message: error.message});    
    }
})

//get a user by username

app.get('/usuario/:username',async (request,response)=>{
    try {

        const {username} = request.params;
        const user = await Usuario.find({"username":username});
        return response.status(200).json(user)
        
    } catch (error) {
        console.log(error);   
        return response.status(500).send({message: error.message}); 
    }
})


mongoose.connect(MONGO_DB_URL)
.then(()=>{
    console.log(`connected to Database`);
    app.listen(PORT, ()=>{
        console.log(`App running in port ${PORT}`);
    });
})
.catch((error) =>{
    console.log(error);
})

