import { useContext, useEffect} from "react"

import axios from "axios"
import { useUserAuthContext } from "../hooks/useUserAuthContext"
import { useNavigate } from "react-router-dom"
import { ProductCartComponet } from "../components/ProductCartComponent"
import { UserCartContext } from "../context/UserCartContext"

export default function cart() {
  
  const {user} = useUserAuthContext()
  const {carts, dispatch, total, isLoading, setIsLoading } = useContext(UserCartContext)

  // const [total, setTotal] = useState(0)
  const navigate = useNavigate()
  
  useEffect(() => {  
    
    async function fecthData(){
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_BACK_END_API}/api/cart/`, {
            headers : {
              'Authorization': `Bearer ${user.token}`
            }
        })
        dispatch({type: 'SET', payload : data})
        
      } catch (error) {
        console.error('error get cart', error)
      }
    }
    
    if(user) 
    {
      fecthData()
    }
    else navigate('/login')


  },[user])
  function checkout(){
    setIsLoading(true)
    axios.post(`${import.meta.env.VITE_BACK_END_API}/api/checkout/`,{},{
      
      headers : {
        'Authorization': `Bearer ${user.token}`
      }

    })
    .then((response) => {
        if(response.status == 200){
          setIsLoading(false)
          console.log(response)  
         window.location.replace(response.data)
        }

    }).catch((error)=>{

      console.log(error)
    })
  }

  return (
    <div className="grid justify-items-stretch">  
        <div className="flex justify-self-center w-5/6 space-x-3 max-laptop:space-x-0 max-minitab:mt-20 ">
             <div className="w-[75%]  z-[-1] max-laptop:w-[100%] max-notebook:w-full ">
                  <div className="flex w-full bg-red shadow-lg rounded p-3 pl-5 text-white font-bold font-xl">CART ITEM LIST</div>
                  <div className="flex w-full h-[550px] flex-col overflow-y-scroll p-3 pb-5 space-y-3">
                  
                      {carts && carts.map((cart) => (

                        <ProductCartComponet key={cart.cart_id} 
                        _id = {cart.cart_id} 
                        name= {cart.product.name}
                        price={cart.product.price}
                        qty={cart.quantity}
                        thumbnail={cart.product.products_info.thumbnail}
                        />

                      ))}
                  </div>

                  
                    
            </div> 
            
                 {/* DISPLAY TOTAL AMOUNT HERE (ORDER SUMMARY)*/}
            <div className=" w-[24%] z-[-1] min-w-[300px] max-h-[21rem] bg-white shadow-lg rounded p-5 max-minitab:px-2 max-tablet:pt-2 max-minitab:top-[220px] max-laptop:w-full  max-laptop:top-[160px] max-laptop:fixed max-laptop:left-[0] max-laptop:p-0 ">
                <div className="flex flex-col w-[96%] ml-[2%] max-laptop:flex-row max-laptop:w-[80%] max-laptop:ml-[10%] max-mobile:w-full max-mobile:ml-0 max-mobile:p-1" > 
                   <div className="flex   flex-col w-full max-laptop:w-[80%] max-laptop:flex-row max-tablet:flex-col"> 

                      <div className="font-semibold text-center p-3 border-b-2 max-laptop:hidden ">Order Summary</div>

                      <div className="mt-5 flex max-laptop:w-[50%] max-laptop:flex max-laptop:mt-0 max-laptop:items-center max-tablet:flex-row max-tablet:w-full">
                          <div className="w-[49%] max-laptop:flex max-laptop:mt-0 max-laptop:pt-0 max-laptop:text-right">Total items :</div>
                          <div className="text-right w-[49%] max-laptop:flex max-laptop:text-left ">0</div>
                      </div>
                      <div className="mt-5 flex  max-laptop:w-[50%] max-laptop:flex max-laptop:mt-0 max-laptop:items-center max-laptop:justify-center max-tablet:w-full">
                          <div className="w-[49%]  max-laptop:flex max-laptop:mt-0 max-laptop:pt-0 max-laptop:text-right">Subtotal :</div>
                          
                          <div className="text-right w-[49%] max-laptop:flex max-laptop:text-left ">P {new Intl.NumberFormat().format(total)}.00</div>
   
                        
                      </div>
                    </div>

                  <div className="mt-5 flex  max-laptop:w-[40%] max-laptop:inline-block max-laptop:mt-0  max-laptop:p-2">
                      <button disabled={isLoading} onClick={checkout} className="flex justify-center w-full bg-red items-center text-white font-semibold py-2 rounded mt-4 max-laptop:ml-[20%] max-laptop:mt-0 max-laptop:w-[150px] 
                      max-mobile:w-[80px] max-mobile:text-xs
                      ">CHECKOUT</button>
                  </div> 
                </div> 
            </div>

        </div>
    </div>
  )
}
