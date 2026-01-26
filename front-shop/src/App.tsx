import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Login from './pages/Login';
import './App.css'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/" element = {<Login />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
