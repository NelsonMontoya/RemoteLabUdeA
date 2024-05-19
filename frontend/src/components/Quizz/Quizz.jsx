import React, { useState } from 'react'
import './Quizz.css'
import { preguntas } from '../../assets/preguntas';
import { useRef } from 'react';
import { Button, Link, Typography } from '@mui/material';



const URL_LABS = 'http://217.15.171.246:1880/ui/#!/1?socketid=AHPV7gXP4L03t6hqAAAN';
const Quizz = () => {
  


  const seleccionarPreguntasAleatorias = (arregloPreguntas, cantidadPreguntas)=>{
    const preguntasClonadas  = [...arregloPreguntas];
    const preguntasAleatorias  = [];
     // Seleccionamos aleatoriamente las preguntas hasta llegar al número deseado
    for (let i = 0; i < cantidadPreguntas; i++) {
      // Generamos un índice aleatorio dentro del rango de preguntas restantes
      const randomIndex = Math.floor(Math.random() * preguntasClonadas.length);
      // Extraemos la pregunta aleatoria del arreglo y la agregamos a la lista de preguntas aleatorias
      preguntasAleatorias.push(preguntasClonadas[randomIndex]);
      console.log(preguntasAleatorias);
      // Eliminamos la pregunta seleccionada del arreglo clonado para evitar duplicados
      preguntasClonadas.splice(randomIndex, 1);
    }

    return preguntasAleatorias;
  }

  // Seleccionamos 5 preguntas aleatorias
  

  let [preguntasAleatorias,setPreguntasAleatorias] = useState(seleccionarPreguntasAleatorias(preguntas, 5))
  let [index, setIndex] = useState(0);
  let [question, setQuestion] = useState(preguntasAleatorias[index]);
  let [lock,setLock] = useState(false);
  let [score, setScore] = useState(0);
  let [result, setResult] = useState(0);

  let op1 = useRef(null);
  let op2 = useRef(null);
  let op3 = useRef(null);
  let op4 = useRef(null);

  let op_array = [op1,op2,op3,op4];



  const  checkAnswer=(event,answer)=>{
    if(lock === false){
      if(question.respuesta === answer){
        event.target.classList.add("correct");
        setLock(true);
        setScore(previousScrore=>previousScrore+1)
      }else{
        event.target.classList.add("wrong");
        setLock(true);
        op_array[question.respuesta -1].current.classList("correct");
      }
    }
  }

const nextButton =()=>{
  if(lock === true){
    if(index === preguntasAleatorias.length -1){
      setResult(true);
      return 0;
    }
    setIndex(++index);
    setQuestion(preguntasAleatorias[index]);
    setLock(false);
    op_array.map((option)=>{
      option.current.classList.remove("wrong");
      option.current.classList.remove("correct");
      return null;
    })
  }
}

const resetButton =()=>{
  setPreguntasAleatorias(seleccionarPreguntasAleatorias(preguntas, 5));
  setIndex(0);
  setQuestion(preguntasAleatorias[0]);
  setScore(0);
  setLock(false);
  setResult(false);
  
}

  return (
    <div className='container'>
      <h1>Quiz</h1>
      <hr/>
      {
        result?<></>:<>
        
        <h2>{index+1}. {question.pregunta}</h2>
        <ul>
          <li ref={op1} onClick={(e)=>{checkAnswer(e,1)}}>{question.opcionUno}</li>
          <li ref={op2} onClick={(e)=>{checkAnswer(e,2)}}>{question.opcionDos}</li>
          <li ref={op3} onClick={(e)=>{checkAnswer(e,3)}}>{question.opcionTres}</li>
          <li ref={op4} onClick={(e)=>{checkAnswer(e,4)}}>{question.opcionCuatro}</li>
        </ul>
        <button onClick={nextButton}>Continuar</button>
        <div className="index">{index+1} de {preguntasAleatorias.length} preguntas</div>
        
        </>
      }

      {
        result?<>        
        <h2>
          Acertaste {score} de {preguntasAleatorias.length} preguntas 
        </h2>
        {
          score>=4?<>
          <Button variant="contained" href={URL_LABS}
            sx={{
              width:250,
              
            }}
          >
              Ir a Laboratorio
          </Button>
            
          </>:<>
            <button onClick={resetButton}>Reintentar</button>
          </>
        }
        
        </>:<></>
      }

    </div>
  )
}

export default Quizz