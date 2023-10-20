import { useEffect, useState } from "react"

import axios from 'axios';
import Footer from "../components/Footer"
import { useLoaderData } from "react-router-dom";
import { Link } from "react-router-dom";

export default function products() {
  const products = useLoaderData()

  return (
    <>
    <div className="flex w-100 justify-center">
        <div className="flex flex-wrap justify-center w-5/6 mt-5">
        {
            products.map( data =>(
              <div className="flex w-1/6 m-1 flex-col p-2 border-gray-300 border-1 shadow-lg hover:border-red bg-white" key={data.id}>
                  <Link to={`../product/${data.id}`}><div className="w-100 bg-gray-300 pt-40 pb-10"></div></Link>
                  <div className="w-100 h-12 text-sm">{data.name}</div>
                  <div className="w-100 text-sm">P {data.price}.00 </div>
                  <div className="w-100"><button className="w-full py-2 text-white font-semibold bg-red">Add to Cart</button></div>
              </div>




              // <tr key={i} >
              //     <td className="font-xl">{data.name}</td>
              //     <td>P {data.price}.00 </td>
              //     <td>&nbsp;</td>
              //     <td> {data.rating}</td>
              // </tr>
            ))
        }
        </div>
     </div>
    
            <Footer />
    </>
  )
}

//loader function
export const productLoader = async ()=>{
  //dont change the api link even if the domain is replace
//  const res = axios.get('https://demolive-api.vercel.app/products')
  const res = await fetch('http://localhost:3000/products')
  // const res = await fetch('https://demolive-api.vercel.app/products') 
    return res.json()
}
// axios.get('http://localhost:3000/products')
// .then(res => setProducts(res.data))
// .catch(err => console.log(err))