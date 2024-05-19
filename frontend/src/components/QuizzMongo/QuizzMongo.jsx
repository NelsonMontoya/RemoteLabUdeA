import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios';
import { Button } from '@mui/material';


const fetchData = () =>{
    const [data,setData] = useState([]);
    
    const getData = async () =>{
        const result = await axios.get('http://localhost:5000/question');
        setData(result.data.data)
    }
    useEffect(()=>{
        getData();
    },[]);

    return data;
}

const URL_LABS = 'http://217.15.171.246:1880/ui/#!/1?socketid=AHPV7gXP4L03t6hqAAAN';


const QuizzMongo = () => { 
  //obtener los datos   
  let datos = fetchData();

  let [lock,setLock] = useState(false);
  let [score, setScore] = useState(0);
  let [indice, setIndice] = useState(0);
  let [result, setResult] = useState(0);



  let op1 = useRef(null);
  let op2 = useRef(null);
  let op3 = useRef(null);
  let op4 = useRef(null);

  let op_array = [op1,op2,op3,op4];

  const  checkAnswer=(event,answer,correctOption)=>{
    if(lock === false){
      if(correctOption === answer ){
        event.target.classList.add("correct");
        setLock(true);
        setScore(previousScrore=>previousScrore+1)
        //setIndice(indice+1)
      }else{
        event.target.classList.add("wrong");
        setLock(false);
        //setIndice(indice+1)
       op_array[correctOption -1].current.classList("correct");
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
      //setQuestion(preguntasAleatorias[index]);
      setLock(false);
      op_array.map((option)=>{
        option.current.classList.remove("wrong");
        option.current.classList.remove("correct");
        return null;
      })
    }
  }


  const resetButton =()=>{
    datos = fetchData();
    setIndice(0);
    //setQuestion(preguntasAleatorias[0]);
    setScore(0);
    setLock(false);
    setResult(false);
    
  }


  if(!datos) return null
    

  return (
    <div className="container">
      <h1>Quiz</h1>
      <hr/>
        <div className="row">           
          <div>
            {datos.map((pregunta,index)=>{
              return(
                index===indice?<>
                <div key={index} >
                  <h2>{index+1}. {pregunta.question}</h2>
                  <ul>
                    <li ref={op1} onClick={(e)=>{checkAnswer(e,1,pregunta.correctOption)}}>{pregunta.optionOne}</li>
                    <li ref={op2} onClick={(e)=>{checkAnswer(e,2,pregunta.correctOption)}}>{pregunta.optionTwo}</li>
                    <li ref={op3} onClick={(e)=>{checkAnswer(e,3,pregunta.correctOption)}}>{pregunta.optionThree}</li>
                    <li ref={op4} onClick={(e)=>{checkAnswer(e,4,pregunta.correctOption)}}>{pregunta.optionFour}</li>
                  </ul>
                </div>
                <button onClick={nextButton}>Continuar</button>
                <div className="index">Pregunta {indice +1} de {datos.length} preguntas </div>
                </>:<></>
                
              )
            })
            }

            {
              result?<>        
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
        </div>
      
    </div>
  )
}

export default QuizzMongo