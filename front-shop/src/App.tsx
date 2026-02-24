import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Login from './pages/Login';
import Register from './pages/Register'
import MainPage from './pages/MainPage'
import SellerPage from './pages/Sellerpage';
import OfferInfo from './pages/OfferInfo';
import Upload from './pages/Upload';
import './App.css'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/" element = {<Login/>}/>
        <Route path = "/register" element = {<Register/>}/>
        <Route path = "/main" element = {<MainPage/>}/>  
        <Route path = "/seller" element = {<SellerPage/>}/>
        <Route path = "/offer/:id" element = {<OfferInfo/>}/>
        <Route path = "/upload" element = {<Upload/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
