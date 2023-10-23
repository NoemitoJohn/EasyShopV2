import { useEffect, useState } from "react"

import axios from 'axios';
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
                  <Link to={`../product/${data.id}`}><div className="w-full h-[200px]"><img src={data.thumbnail} alt="" className="h-full  w-full" /></div></Link>
                  <div className="w-100 h-12 text-sm">{data.name}</div>
                  <div className="w-100 text-sm">P {new Intl.NumberFormat().format(data.price)}.00 </div>
                  <div className="w-100"><button className="w-full py-2 text-white font-semibold bg-red">Add to Cart</button></div>
              </div>
            ))
        }
        </div>
     </div>
    </>
  )
}
