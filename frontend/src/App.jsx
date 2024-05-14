import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Quizz from './components/Quizz/Quizz'
import CrearPregunta from './components/Preguntas/CrearPregunta'


const App = () => {
  return (
    <Routes>
      <Route path='/usuario/login' element={<SignIn />}/>
      <Route path='/usuario/signup' element={<SignUp />}/>
      <Route path='/quizz' element={<Quizz />}/>
      <Route path='/crearpregunta' element={<CrearPregunta />}/>
    </Routes>
  )
}

export default App
