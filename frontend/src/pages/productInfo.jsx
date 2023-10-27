import { useLoaderData, useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import {useUserAuthContext}   from "../hooks/useUserAuthContext"
import axios from "axios"

export default function productInfo() {
    // const { id } = useParams()
    
    const productInfo = useLoaderData()

    const [id, setId] = useState(productInfo.product.id)
    const [stocks, setStocks] = useState((productInfo.product.inventory.in - productInfo.product.inventory.out))
    const [price, setPrice] = useState(productInfo.product.price)
    const [quantity, setQuatity] = useState(1)
    const navigate = useNavigate()
    const {user} =  useUserAuthContext()


    console.log('user', user)
    useEffect(() =>{
        const priceTemp = productInfo.product.price;
        setPrice(priceTemp * quantity)
        
    },[quantity])
    
    
    function handleIncrement (prev){
        // console.log(e)
        if(quantity < stocks)
        setQuatity(prev + 1)
    }
    
    function handleDecrement (prev){
        // console.log(e)
        if(quantity > 1)
        setQuatity(prev - 1)
    }

    function handleAddCart(){
        
        if(!user) navigate('/login')
        console.log('user', user)
        const addCart = async() => {
           const  {data}  = await axios.post(`${import.meta.env.VITE_BACK_END_API}/api/cart/`, {product_id: id, quantity : quantity},
           {
                headers : {
                'Authorization': `Bearer ${user.token}`
                }
           })
           console.log(data)
        }
        
        addCart()
        
    }

    return (
    <div className="grid justify-items-stretch pt-10">
        <div className="flex justify-self-center space-x-4 w-4/6  p-5">
            <div className="flex justify-center items-center w-1/2 rounded bg-white shadow-lg p-2">
               
            <div class="slider">
  
                <a href="#slide-1">1</a>
                <a href="#slide-2">2</a>
                <a href="#slide-3">3</a>
                <a href="#slide-4">4</a>
                <a href="#slide-5">5</a>

                <div class="slides">
                    <div id="slide-1">
                    1
                    </div>
                    <div id="slide-2">
                    2
                    </div>
                    <div id="slide-3">
                    3
                    </div>
                    <div id="slide-4">
                    4
                    </div>
                    <div id="slide-5">
                    5
                    </div>
                </div>
                </div>
            </div>
            

            <div className="flex flex-col w-1/2 bg-white rounded p-10 shadow-lg ">
                <div className="w-full text-2xl font-semibold">{productInfo.product.name} </div>
                <div className="mt-2">Ratings: {productInfo.product.rating} </div>
                <div className="mb-8 border-b-2 pb-3">Stocks : {stocks} </div>
                <div className="mb-8 w-full text-4xl font-bold"> &#x20B1; {new Intl.NumberFormat().format(price)}.00</div>

                <div className="flex w-full justify-between space-x-4">
                    {/* <input className="w-1/2 rounded border-2  pl-4 pr-2"  type="number"   value={quantity} max={productInfo.product.stocks} id="quantity" name="quantity" /> */}
                    <div>
                        <div className="flex ">
                            <button onClick={() => handleDecrement(quantity)} className="bg-red rounded text-white font-semibold w-1/4 py-1">-</button>
                            <input type="text" style={{width : '39%'}} className="text-center border-2" value={quantity} readOnly />
                            <button onClick={() => handleIncrement(quantity)} className="bg-red rounded text-white font-semibold w-1/4 py-1">+</button>
                        </div>


                    </div>
                    <div className="w-1/2"><button onClick={handleAddCart} className="bg-red rounded text-white font-semibold w-full py-1">Add To Cart</button></div>
                </div>
                
                
                <div className="border-t-2 mt-8 pt-5">
                    <h3 className="font-semibold">Description</h3>
                    {productInfo.description} 
                </div>
            </div>


            {/* <div className="">{productInfo.name}</div>
            <div className="">{productInfo.price}.00</div>
            <div className="">{productInfo.rating}</div>
            <div className="">{productInfo.stocks}</div>
            <div className="">{productInfo.decs}</div>
            <div className="">{productInfo.cat_name}</div> */}
        </div>
        
    </div>
   
  )
}