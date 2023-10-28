import { Link, useLoaderData } from "react-router-dom"
import React, { useState } from 'react'
import { Carousel } from "../components/carousel"
function Home() {
  const data = useLoaderData()
  const slides = [
    {
      "src": "/images/image1.jpg",
      "alt": "Image 1 for carousel"
    },
    {
      "src": "/images/image2.jpg",
      "alt": "Image 2 for carousel"
    },
    {
      "src": "/images/image3.jpg",
      "alt": "Image 3 for carousel"
    }
  ];

  return (
    <>
    
        <div className="w-full flex flex-col justify-center items-center">
            <div className="flex w-4/6 mt-[-80px] max-notebook:w-[90%] z-[0] max-minitab:mt-[-39px] max-minitab:w-full max-minitab:rounded-none ">
               
             <div className=" w-full  h-[30vw] min-h-[120px] rounded-none">
               <Carousel data={slides} />
              </div>
            </div>
            <div className="w-5/6 flex flex-col mt-[2%] max-notebook:w-[90%]">
                
              <div className="flex w-100 justify-center flex-col ">
                  <div className="flex flex-wrap justify-center  mt-3 w-full  XSmobile:w-[100%] desktop:px-20" >
                  {
                      data.map( data =>(
                        <div key={data.id} className="flex m-1 flex-col p-2 w-[230px] border-gray-300 border-1 shadow-lg hover:border-red bg-white max-mobile:w-[120px] max-MDmobile:w-[160px]" >
                            <Link to={`../product/${data.id}`}><div className="w-full  h-[150px] min-[650px]:h-[200px]"><img src={data.products_info.thumbnail} alt="" className="w-full h-full " /></div></Link>
                            <div className="w-100 h-12 text-base max-minitab:text-sm ">{data.name}</div>
                            <div className="w-100 text-lg font-bold text-red">P {new Intl.NumberFormat().format(data.price)}.00 </div>
                            <div className="w-100"></div>
                        </div>
                      ))
                      }
                  </div>
                </div>
                  
                
            </div>
        </div>
        
    </>
  )
  
}

export default Home
