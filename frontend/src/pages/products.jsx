import { useEffect, useState } from "react"

import axios from 'axios';
import { useLoaderData } from "react-router-dom";
import { Link } from "react-router-dom";

export default function products() {
  const products = useLoaderData()

  return (
    <>
    <div className="flex w-100 justify-center">
        <div className="flex flex-wrap justify-center  mt-3 w-full  XSmobile:w-[100%] ring-2 desktop:px-40" >
        {
            products.map( data =>(
              <div key={data.id} className="flex m-1 flex-col p-2 border-gray-300 border-1 shadow-lg hover:border-red bg-white 
               tablet:h-[330px] tablet:w-[200px] mobile:h-[250px] mobile:w-[180px] Smobile:w-[125px] XSmobile:w-[140px]" >
                  <Link to={`../product/${data.id}`}><div className="w-full  h-[150px] min-[650px]:h-[200px]"><img src={data.thumbnail} alt="" className="w-full h-full " /></div></Link>
                  <div className="w-100 h-12 text-sm ">{data.name}</div>
                  <div className="w-100 text-sm">P {new Intl.NumberFormat().format(data.price)}.00 </div>
                  <div className="w-100"></div>
              </div>
            ))
            }
        </div>
     </div>
    </>
  )
}
