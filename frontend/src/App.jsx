
import Home from "./pages/home"
import Products from "./pages/products"
import Login from "./pages/login"
import Signup from "./pages/signup"
import Cart from './pages/cart'
import ProductInfo from './pages/productInfo'

import './index.css'
import RootLayout from './layouts/RootLayout'


//LOADERS
import { productLoader, productInfoLoader, categoriesLoader}  from './loader/productloader'

// ADMIN PAGES IMPORT
import AdminRootLayout from "./layouts/AdminRootLayout"
import AdminLogin from "./adminPages/adminLogin"
import AdminDashboardRoot from "./layouts/AdminDashboardRoot"
import AddProducts from "./adminPages/addProducts"
import AddStocks from "./adminPages/addStocks"
import ProductList from "./adminPages/productList"
import Category from "./adminPages/category"
import ViewUpdateProduct from "./adminPages/viewUpdateProduct"



import {createBrowserRouter, 
    BrowserRouter, 
    Route, 
    createRoutesFromElements
} from 'react-router-dom'
import { RouterProvider } from 'react-router-dom'
import NotFound from './pages/NotFound'




const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<RootLayout />} >
                <Route index element={<Home/>}></Route>
                <Route path="products" element={<Products/>} loader={productLoader} />
                <Route path='product/:id' element={<ProductInfo />} loader={productInfoLoader} />
                <Route path="login" element={<Login/>} />
                <Route path="signup" element={<Signup/>} />
                <Route path="cart" element={<Cart/>} />
                <Route path="*" element={<NotFound />} />

            </Route>

             <Route path="/admin" element={<AdminRootLayout />}>
                 <Route index element={<AdminLogin />} />
                 <Route path="dashboard" element={<AdminDashboardRoot />}> 
                        <Route index path="product-list" element={<ProductList />} loader={productLoader} />

                        <Route path="view/:id" element={<ViewUpdateProduct />} loader={productInfoLoader} />
                   
                        <Route path="add-products" element={<AddProducts />} loader={categoriesLoader}/>
                        <Route path="add-stocks" element={<AddStocks />}/>
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
