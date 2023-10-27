import { useLoaderData, useParams } from "react-router-dom"
import { useState } from "react"
import axios from "axios"


export default function addStocks() {
    
  const adminProductInfo = useLoaderData()
  const [qty, setQty] = useState(0)
  const [currentQty, setcurrentQty] = useState(adminProductInfo.product.inventory.in - adminProductInfo.product.inventory.out)
  const [productId, setProductId] = useState(adminProductInfo.product.id)
  console.log(adminProductInfo)
  
  async function handleSubmit(e){
    //TODO: change to production Url
    e.preventDefault()
    try {
      const {data} = await axios.post('http://127.0.0.1:3000/api/admin/stocks', {id : productId, quantity : qty })
      setcurrentQty(data.current)
    } catch (error) {
        console.log(error)
    }

  }

  return (
    <>
        <div className="w-[45%] p-5 ">
       
       <table className="w-[40%] leading-normal fixed">
           <thead>
             <tr className=" bg-red text-white text-sm ">
               <th className="px-5 py-3 border-b-2 border-gray-200 text-lg font-bold  uppercase tracking-wider text-center">ADD PRODUCT STOCKS</th>
             </tr>
           </thead>

           <tbody>
             <tr>
               <td className="border-gray-200 bg-white text-sm flex justify-center pb-5">
                 <div className="w-[90%] mt-8">
                    {/* FORM START HERE */}
                    <form onSubmit={handleSubmit} className="w-full">
                       <div className="w-full flex ">
                         <span className="border-1 w-1/2 flex justify-center font-bold text-white text-base bg-gray-400 py-2">PRODUCT NAME</span> 
                         <span className="border-1 w-1/2 flex justify-center font-bold text-white text-base bg-gray-400 py-2">CURRENT STOCKS</span>
                       </div>

                       <div className="w-full flex">
                         
                         <span className="border-1  w-1/2 flex justify-center  italic font-bold text-gray-700 py-1">{adminProductInfo.product.name} </span>
                         <span className="border-1  w-1/2 flex justify-center  italic font-bold text-sky-600 py-1 test-xl">{currentQty } </span>  
                       </div> 

                    {/* PRODUCT STOCK INPUT*/}

                        <div className="flex flex-col mb-2">
                            <label htmlFor="" className="text-gray-500 mb-2 font-semibold mt-5 ">INPUT QUANTITY HERE :</label>

                            <input onChange={(e) => setQty(e.target.value)}  value={qty} name="addStock" type="number" min="0" oninput="this.value = Math.abs(this.value)" placeholder="0" className=" shadow-md p-2 pl-3 border-gray-300 bg-gray-100 rounded " />
                        </div>

                       <div className="w-full flex justify-center mt-5"> 
                            <button className="w-[50%] bg-gray-500 text-white font-bold py-2 rounded-md">Add Stocks</button> 
                       </div>
                    </form>
                 </div>
               </td>
             
             </tr>
     
           </tbody>
         </table>
           
       </div>
       




    </>
  )
}
