import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'\
import Home from "./pages/home"
import Products from "./pages/products"
import Login from "./pages/login"
import Signup from "./pages/signup"
import './index.css'
import Navbar from './components/Navbar'
import {createBrowserRouter, BrowserRouter, Routes, Route, Link, NavLink} from 'react-router-dom'


function App(){


  return(
      <BrowserRouter>
      <header>
          <nav className='bg-gray-900'>
               <Navbar/>
          </nav>
      </header>
          <Routes>
              <Route path="/" element={<Home/>}></Route>
              <Route path="/products" element={<Products/>}></Route>
              <Route path="/login" element={<Login/>}></Route>
              <Route path="/signup" element={<Signup/>}></Route>
          </Routes>
      </BrowserRouter>
  )

}

export default App
