import { useState } from "react"
import { useLoaderData, useParams } from "react-router-dom"


export default function productInfo() {
    //TODO: create udpate product end point  
    const { id } = useParams()
    const adminProductInfo = useLoaderData()
    const [_id, setId] = useState(adminProductInfo.id)
    
  return (
    <>
          
        <div className="w-full flex flex-row justify-evenly">
          <div className="w-[45%] p-5 ">
       
          <table className="w-[40%] leading-normal fixed">
              <thead>
                <tr className=" bg-red text-white text-sm ">
                  <th className="px-5 py-3 border-b-2 border-gray-200 text-lg font-bold  uppercase tracking-wider text-center">PRODUCT DETAILS</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td className="border-gray-200 bg-white text-sm h-[200px] flex justify-center">
                    <div className="w-[90%] mt-8">
                          <div className="">
                            <span className="font-bold text-gray-500 text-base mr-3">PRODUCT NAME : </span> 
                            <span className="italic font-bold text-gray-700">{adminProductInfo.product.name} </span>
                          </div>

                          <div className="">
                            <span className="font-bold text-gray-500 text-base mr-3">PRICE : </span> 
                            <span className="italic font-bold text-gray-700">&#x20B1; {adminProductInfo.product.price}.00 </span>
                          </div>

                          <div className="">
                            <span className="font-bold text-gray-500 text-base mr-3">STOCKS : </span>
                            <span className="italic font-bold text-gray-700">{adminProductInfo.product.inventory.in - adminProductInfo.product.inventory.out} </span>  
                          </div>

                          <div className="">
                            <span className="font-bold text-gray-500 text-base mr-3">RATINGS : </span> 
                            <span className="italic font-bold text-gray-700">{adminProductInfo.product.rating} </span>  
                          </div>

                          <div className="">
                            <span className="font-bold text-gray-500 text-base mr-3">DESCRIPTION : </span>  
                            <span className="italic font-bold text-gray-700">{adminProductInfo.description} </span>  
                          </div>
                   
                    </div>
                  </td>
                
                </tr>
        
              </tbody>
            </table>
              
          </div>
          








          <div className="w-[45%] rounded-t-xl">
          <form action="w-full">
             <table className="w-[100%] leading-normal ">
              <thead>
                <tr className=" bg-red text-white text-sm ">
                  <th className="px-5 py-3 border-b-2 border-gray-200 text-lg font-bold  uppercase tracking-wider text-center">UPDATE PRODUCT INFO</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td className="border-gray-200 bg-white text-sm  flex justify-center pb-10">
                    <div className="w-[90%] mt-8">
                         <div className="flex w-full justify-between mb-5">
                            <span className="flex w-[25%] justify-start font-bold text-gray-500 text-base mr-3">PRODUCT NAME : </span> 
                            <span className="flex w-[60%] justify-end"><input  name="productName" type="text" placeholder={adminProductInfo.product.name} required className="w-full h-10 shadow-md p-2 pl-3 border-gray-300 bg-gray-100 rounded " /></span>
                          </div>

                          <div className="flex w-full justify-between mb-5">
                            <span className="flex w-[25%] justify-start font-bold text-gray-500 text-base mr-3">PRICE : </span> 
                            <span className="flex w-[60%] justify-end"> <input name="productName" type="text" placeholder={adminProductInfo.product.price} required className="w-full h-10 shadow-md p-2 pl-3 border-gray-300 bg-gray-100 rounded " /></span>
                          </div>

                          <div className="flex flex-col w-full  mb-5">
                            <span className="flex w-full font-bold text-gray-500 text-base mr-3 mb-3">DESCRIPTION : </span>   
                            <textarea
                                id="about"
                                name="product_desc"
                                rows={3}
                                className="shadow-md p-2 pl-3 h-[150px] border-gray-300 bg-gray-100 rounded block w-full border-0 py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                defaultValue={''}
                            />
                          </div>
                          <div className="flex flex-col justify-center items-center mt-5">
                              <button className="w-[50%] bg-gray-500 text-white font-bold py-2 rounded-md mt-5">UPDATE PRODUCT</button>
                          </div>
                        </div>
                     </td>

                     
                </tr>

              </tbody>
            </table>
            </form>
          </div>
        
      
        </div>
        
    </>
  )
}
