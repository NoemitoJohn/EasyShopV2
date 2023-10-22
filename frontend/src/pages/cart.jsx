import { useEffect } from "react"

import axios from "axios"
import { useUserAuthContext } from "../hooks/useUserAuthContext"
import { useNavigate } from "react-router-dom"

export default function cart() {
  
  const {user} = useUserAuthContext()
  const navigate = useNavigate()
  
  useEffect(() => {
    
    async function fecthData(){
      
      const { data } = await axios.get('http://127.0.0.1:3000/api/cart/', {
          headers : {
            'Authorization': `Bearer ${user.token}`
          }
      })
      console.log(data)
    }

    if(user){
      fecthData()
    }else{
      navigate('/login')
    }


  },[user])



  return (
    <div className="grid justify-items-stretch">  
        <div className="flex justify-self-center w-4/6 space-x-3 ">
            <div className="w-4/6 space-y-3">
                  <div className="flex w-full bg-white shadow-lg rounded p-3 pl-5 text-gray-700 font-bold font-xl">CART ITEM LIST</div>

                  {/* DISPLAY CART ITEM START HERE */}
                  <div className="flex space-x-3 w-full bg-white shadow-lg rounded p-3 pl-5 text-gray-700 font-bold font-xl">
                    
                        <div className="flex items-center font-medium ">
                           {/* CHECK BOX*/}
                            <input id="default-checkbox" type="checkbox" value="" className="w-5 h-5" />
                        </div>
                        <div className="w-2/12" ><img src="" alt="" className="p-12 bg-gray-400" /></div>
                         {/* PRODUCT NAME*/}
                        <div className="w-4/12 flex items-center font-medium text-gray-900">Sample Product Name</div>
                        
                          {/* PRODUCT PRICE*/}
                        <div className="w-1/12 flex justify-center items-center font-medium text-gray-900 "><p>&#x20B1; 23.00</p></div>
                        <div className="w-1/12 flex justify-center items-center">
                          {/* INPUT QUANTITY*/}
                             <input className="w-1/2 rounded pl-4 pr-2" id="qty_input" type="number"  value="1" max="<%= product.stock %>" name="quantity" />  
                        </div>
                          {/* TOTAL PRICE BASE ON QUANTITY*/}
                        <div className="w-1/12 flex justify-center items-center font-medium text-gray-900">&#x20B1; 66.00</div>
                        
                        <div className="w-1/12 flex justify-end items-center font-medium text-gray-900 ">
                          {/* X  BUTTON REMOVE ITEM BUTTON */}
                            <button className="text-red ">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.9} stroke="currentColor" className="w-6 h-6  XHover">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                            
                        </div>
                  </div>

            </div>
            






                 {/* DISPLAY TOTAL AMOUNT HERE (ORDER SUMMARY)*/}
            <div className="w-2/6 max-h-[21rem] bg-white shadow-lg rounded p-5">
                  <div className="font-semibold pb-3 border-b-2">Order Summary</div>
                  <div className="mt-5 flex">
                      <div className="w-1/2">Total items :</div>
                      <div className="text-right w-1/2">P 0.00</div>
                    </div>
                  <div className="mt-5 flex">
                       <div className="w-1/2">Subtotal :</div>
                      <div className="w-1/2 text-end">0</div>
                  </div>
                  <div className="mt-5 border-t-2 pt-2">Location :</div>
                  <div className="italic text-gray-500">Sample Address @ street b5 l8, Barangay, City, Province</div>

                  <div className="w-full"><button className="w-full bg-red text-white font-semibold py-2 rounded mt-4">PROCEED TO CHECKOUT</button></div>
            </div>

        </div>
    </div>
  )
}
