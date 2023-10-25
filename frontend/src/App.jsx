import { useEffect, useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'\
import Home from "./pages/home"
import Products from "./pages/products"
import Login from "./pages/login"
import Signup from "./pages/signup"
import SignupVerify from './pages/signupVerify'
import Cart from './pages/cart'
import ProductInfo from './pages/productInfo'

import './index.css'
import RootLayout from './layouts/RootLayout'
import { UserAuthContextProvider } from './context/UserAuthContext.jsx'

//LOADERS
import { productLoader, productInfoLoader, categoriesLoader}  from './loader/productloader'

// ADMIN PAGES IMPORT
import AdminRootLayout from "./layouts/AdminRootLayout"
import AdminLogin from "./adminPages/adminLogin"
import AdminDashboardRoot from "./layouts/AdminDashboardRoot"
import AddProducts from "./adminPages/addProducts"
import ProductStocks from "./adminPages/productStocks"
import ProductList from "./adminPages/productList"
import Category from "./adminPages/category"
import ViewUpdateProduct from "./adminPages/viewUpdateProduct"
import { UserCartContextProvider } from './context/UserCartContext'
import AddStocks from './adminPages/addStocks'


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
        <>
            {/* <UserAuthContextProvider> */}
                
                <Route path="/" element={
                <UserAuthContextProvider>
                    <RootLayout />
                </UserAuthContextProvider>
                }>
                    <Route index element={<Home/>}></Route>
                    <Route path="products" 
                    element={<Products/>}
                    loader={productLoader} ></Route>
                    <Route path='product/:id' element={<ProductInfo />} loader={productInfoLoader} ></Route>
                    <Route path="login" element={<Login/>}></Route>
                    <Route path='signup'>
                        <Route index element={<Signup/>}></Route>
                        <Route path="verify/:token" 
                        element={<SignupVerify/>}
                        ></Route>
                        
                    </Route>
                    <Route path="cart" element={
                        <UserCartContextProvider>
                            <Cart/>
                        </UserCartContextProvider>
                    }></Route>

                    <Route path="*" element={<NotFound />}></Route>
                    
                </Route>

             <Route path="/admin" element={<AdminRootLayout />}>
                 <Route index element={<AdminLogin />} />
                 <Route path="dashboard" element={<AdminDashboardRoot />}> 
                        <Route path="product-list" element={<ProductList />} loader={productLoader} />
                        <Route path="view/:id" element={<ViewUpdateProduct />} loader={productInfoLoader} />
                        
                        <Route path="add-products" element={<AddProducts />} loader={categoriesLoader}/>
                        <Route path="product-stocks" element={<ProductStocks />}  loader={productLoader} />
                        <Route path="add_stocks/:id" element={<AddStocks />} loader={productInfoLoader}  />
                        <Route path="category" element={<Category />}loader={categoriesLoader}/>
                 </Route>

            </Route>
        </>
        
    )
)

function App(){
  return(


        <RouterProvider router={router}/>
  )
}

export default App
