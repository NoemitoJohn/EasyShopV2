import { useEffect, useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'\
import Home from "./pages/home"
import Products, { productLoader } from "./pages/products"
import Login from "./pages/login"
import Signup from "./pages/signup"
import SignupVerify from './pages/signupVerify'
import Cart from './pages/cart'
import ProductInfo, { productInfoLoader } from './pages/productInfo'
import './index.css'
import RootLayout from './layouts/RootLayout'


import {createBrowserRouter, 
    BrowserRouter, 
    Route, 
    createRoutesFromElements
} from 'react-router-dom'
import { RouterProvider } from 'react-router-dom'
import NotFound from './pages/NotFound'
import axios, { Axios } from 'axios'

const router = createBrowserRouter(
    createRoutesFromElements(

            <Route path="/" element={<RootLayout />}>
                <Route index element={<Home/>}></Route>
                <Route path="products" element={<Products/>} loader={productLoader} ></Route>
                <Route path='product/:id' element={<ProductInfo />} loader={productInfoLoader} ></Route>
                <Route path="login" element={<Login/>}></Route>
                <Route path='signup'>
                    <Route index element={<Signup/>}></Route>
                    <Route path="verify/:token" 
                    element={<SignupVerify/>}
                    ></Route>
                    
                </Route>
                <Route path="cart" element={<Cart/>}></Route>

                <Route path="*" element={<NotFound />}></Route>

            </Route>
        
    )
)

function App(){
  return(
     <RouterProvider router={router}/>
  )
}

export default App
