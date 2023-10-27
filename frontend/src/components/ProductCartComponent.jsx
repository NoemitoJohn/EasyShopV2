import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { useUserAuthContext } from "../hooks/useUserAuthContext"
import { UserCartContext } from "../context/UserCartContext"

export const ProductCartComponet = ({_id, name, price, qty, thumbnail}) =>{
  
  const {user} = useUserAuthContext()     
  const {dispatch, setIsLoading} = useContext(UserCartContext)
  
  const [total, setTotal] = useState(price * qty)
  const [id, setId] = useState(_id)
  const [quantity, setQuantiy] = useState(qty)

  //update product if quantity is change
  useEffect(()=>{
      setIsLoading(true)
      const timer = setTimeout(()=>{
        axios.patch('http://127.0.0.1:3000/api/cart', {cart_id : id, quantity : quantity},
        {
          headers : {
            'Authorization': `Bearer ${user.token}`
          }
        }).then((response) =>{
          if(response.data == 1){
            setTotal(price * quantity)
            dispatch({type: 'UPDATE', payload: {cart_id : id, quantity : quantity}})
            setIsLoading(false)
          }

        })
        
      }, 1500)
      return () => clearTimeout(timer)
  },[quantity])

  function handleRemove(){
    // DELETE request 
    setIsLoading(true)
    axios.delete(`http://127.0.0.1:3000/api/cart/${id}`, {
    headers : {
      'Authorization': `Bearer ${user.token}`
    }
    }).then((response) =>{
        if(response.status == 200){
          dispatch({type: 'DELETE', payload : response.data.cart_id})
          setIsLoading(false)
        }
    }).catch((error) =>{
      console.error('error', error)
    })
}

return(
  <div className="flex space-x-3 w-full bg-white shadow-lg rounded p-3 pl-5 text-gray-700 font-bold font-xl">
  
      <div className="flex items-center font-medium ">
      {/* CHECK BOX*/}
         <input id="default-checkbox" type="checkbox" value="" className="w-5 h-5" />
      </div>

      <div className="w-2/12" ><img src={thumbnail} alt="" className="border-2" /></div>
      {/* PRODUCT NAME*/}
      <div className="w-3/12 flex items-center font-medium text-gray-900">{name}</div>
      
      {/* PRODUCT PRICE*/}
      <div className="w-2/12 flex justify-center text-[15px] items-center font-medium text-gray-900"><p>&#x20B1; {new Intl.NumberFormat().format(price)}.00</p></div>
      
      <div className="w-2/12 flex justify-center items-center">
      {/* INPUT QUANTITY*/}
      {/* <input className="w-1/2 rounded pl-4 pr-2" id="qty_input" type="number" value="1" name="quantity" />   */}
          <button onClick={() => setQuantiy(quantity - 1)} className="p-1">-</button>
          <p className="p-2 border-1 ">{quantity}</p>
      {/* <input type="number" value={quantity} change /> */}
          <button onClick={() => setQuantiy(quantity + 1)} className="p-1">+</button>
      </div>
    
      {/* TOTAL PRICE BASE ON QUANTITY*/}
      <div className="w-2/12 flex justify-center items-center text-[15px] font-medium text-gray-900">&#x20B1; {new Intl.NumberFormat().format(total)}.00</div>
      
      <div className=" flex justify-end items-center font-medium text-gray-900 ">
      {/* X  BUTTON REMOVE ITEM BUTTON */}
          <button onClick={handleRemove} className="text-red ">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.9} stroke="currentColor" className="w-6 h-6  XHover">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
          </button>
      
      </div>
  </div>
  )
  
}