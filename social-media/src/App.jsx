import react from 'react'
import { useState } from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import {Header} from './components/Header/Header'
import {useDispatch} from 'react-redux'

import './App.css'
import { Load_user } from './components/Login/Login_user'

function App() {
  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(Load_user())
  })
  

  return (
    <Router>
    <Header/>
    </Router>
  )
}

export default App
