import { useEffect, useState } from "react"

import axios from 'axios';
import { useLoaderData, useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function products() {
  
  const data = useLoaderData()

  //TODO: implement paganation
  return (
    <>
    
    <div className="flex w-100 justify-center flex-col ">
     
    <h2 className="w-full flex justify-center text-lg text-gray-500 mb-5">All products</h2>
        <div className="flex flex-wrap justify-center  mt-3 w-full  XSmobile:w-[100%] desktop:px-20" >
        {
            data.products.map( data =>(
              <div key={data.id} className="flex m-1 flex-col p-2 w-[180px] border-gray-300 border-1 shadow-lg hover:border-red bg-white max-mobile:w-[120px] max-MDmobile:w-[160px]" >
                  <Link to={`../product/${data.id}`}><div className="w-full  h-[150px] min-[650px]:h-[200px]"><img src={data.products_info.thumbnail} alt="" className="w-full h-full " /></div></Link>
                  <div className="w-100 h-12 text-sm max-minitab:text-xs ">{data.name}</div>
                  <div className="w-100 text-sm font-semibold text-red">P {new Intl.NumberFormat().format(data.price)}.00 </div>
                  <div className="w-100"></div>
              </div>
            ))
            }
        </div>
     </div>
    </>
  )
}
