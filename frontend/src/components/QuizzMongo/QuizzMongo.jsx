import React, { useEffect, useState } from 'react'
import { Button } from '@mui/material';
import '../Quizz/Quizz.css'
import axios from 'axios';
import { URL_LABS, url_preguntas } from '../../URLS/Urls';


const QuizzMongo = () => { 
  const [datos,setDatos] = useState([]);
  const [error,setError] = useState('');
  const [cargando, setCargando] = useState(true);
  const [lock,setLock] = useState(false);
  const [score, setScore] = useState(0);
  const [indice, setIndice] = useState(0);
  const [result, setResult] = useState(0);
  const [repeticiones,setRepeticiones] = useState(0);
  //let [loading, setLoading] = useState(false);

  useEffect(()=>{
    if(cargando){
      const getData = async()=>{
        try {
          axios
            .get(url_preguntas)
            .then((respuesta) =>setDatos(respuesta.data.data))
            .catch(error => setError(error))

        } catch (error) {
          setError('Error en la consulta de la base de datos')
        }
      }

      getData();
      setCargando(false)
    }
  },[cargando])

  const  checkAnswer=(event,answer,correctOption)=>{
    if(lock === false){
      if(correctOption === answer ){
        event.target.classList.add("correct");
        setLock(true);
        setScore(previousScrore=>previousScrore+1)
      }else{
        event.target.classList.add("wrong");
        setLock(true);
      }
    }
  }


  const nextButton =()=>{
    if(lock === true){
      if(indice === datos.length -1){
        setResult(true);
        return 0;
      }
      setIndice(indice+1);
      setLock(false);
     
    }
  }


  const resetButton =()=>{
    setCargando(true);
    setIndice(0);
    setScore(0);
    setLock(false);
    setResult(false);
    setRepeticiones(repeticiones+1)
    
  }

  if(cargando){
    return(
      <div className="container">
        <h1>Cargando...</h1>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container">
        <h1>{error}</h1>
        <button onClick={resetButton}>Volver a intentarlo</button>
      </div>
    );
  }

  
  return (
    <div >
            {datos.map((pregunta,index)=>{
              return(
                index===indice?<>
                <div key={index} className='container'>
                  {
                    result?<></>:<>
                    <h1>Quiz</h1>
                    <hr/>
                    <h2>{index+1}. {pregunta.question}</h2>
                    <ul>
                      <li onClick={(e)=>{checkAnswer(e,1,pregunta.correctOption)}}>A. {pregunta.optionOne}</li>
                      <li onClick={(e)=>{checkAnswer(e,2,pregunta.correctOption)}}>B. {pregunta.optionTwo}</li>
                      <li onClick={(e)=>{checkAnswer(e,3,pregunta.correctOption)}}>C. {pregunta.optionThree}</li>
                      <li onClick={(e)=>{checkAnswer(e,4,pregunta.correctOption)}}>D. {pregunta.optionFour}</li>
                    </ul>
                    <button onClick={nextButton}>Continuar</button>
                    <div className="index"> {indice +1} de {datos.length} preguntas </div>
                    </>
                  }

            {
              result?<> 
              <h1>Quiz</h1>
              <hr/>       
              <h2>
                Acertaste {score} de {datos.length} preguntas 
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
                
                </>:<></>
                
              )
            })
            }

    </div>
  )
}

export default QuizzMongo