import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Login from './pages/Login';
import Register from './pages/Register'
import MainPage from './pages/MainPage'
import './App.css'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/" element = {<Login/>}/>
        <Route path = "/register" element = {<Register/>}/>
        <Route path = "/main" element = {<MainPage/>}/>  
      </Routes>
    </BrowserRouter>
  )
}

export default App
