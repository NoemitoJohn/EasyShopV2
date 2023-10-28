import { useLoaderData, useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import {useUserAuthContext}   from "../hooks/useUserAuthContext"
import axios from "axios"
import { Carousel } from "../components/carousel"

export default function productInfo() {
    // const { id } = useParams()
    
    const productInfo = useLoaderData()

    const [id, setId] = useState(productInfo.product.id)
    const [stocks, setStocks] = useState((productInfo.product.inventory.in - productInfo.product.inventory.out))
    const [price, setPrice] = useState(productInfo.product.price)
    const [quantity, setQuatity] = useState(1)
    const navigate = useNavigate()
    const {user} =  useUserAuthContext()
    const img1 = productInfo.img_url[0]
    const img2 = productInfo.img_url[1]
    const img3 = productInfo.img_url[2]
    const img4 = productInfo.img_url[3]

    const slides = [
        {
          "src": `${img1}`,
          "alt": "Image 1 for carousel"
        },
        {
          "src": `${img2}`,
          "alt": "Image 2 for carousel"
        },
        {
          "src": `${img3}`,
          "alt": "Image 3 for carousel"
        },
        {
          "src": `${img4}`,
          "alt": "Image 3 for carousel"
        }
      ];
    


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
    <div className="flex w-full justify-center pt-10">
        <div className="flex  justify-center  space-x-4 w-4/6  p-5 max-notebook:flex-col max-notebook:items-center max-notebook:space-x-0 max-tablet:p-0 max-laptop:w-5/6">
            <div className="flex justify-center items-center w-1/2 rounded bg-white shadow-lg p-2 max-notebook:mb-5 max-notebook:w-[80%] max-tablet:w-full">
                <div className=" w-full  h-full rounded-none">
                     <Carousel data={slides} />
                </div>
            </div>
            

            <div className="flex flex-col justify-center w-1/2 h-[420px] bg-white rounded p-10 shadow-lg max-notebook:w-[80%] max-tablet:w-full max-mobile:h-[450px]">
                <div className="w-full text-2xl font-semibold max-tablet:text-lg">{productInfo.product.name} </div>
                <div className="mt-2 max-tablet:text-sm">Ratings: {productInfo.product.rating} </div>
                <div className="mb-8 border-b-2 pb-3 max-tablet:text-sm">Stocks : {stocks} </div>
                <div className="mb-8 w-full text-4xl font-bold max-tablet:text-xl"> &#x20B1; {new Intl.NumberFormat().format(price)}.00</div>

                <div className="flex w-full justify-between space-x-4 max-tablet:flex-col max-tablet:space-x-0">
                    {/* <input className="w-1/2 rounded border-2  pl-4 pr-2"  type="number"   value={quantity} max={productInfo.product.stocks} id="quantity" name="quantity" /> */}
                    <div>
                        <div className="flex max-tablet:mb-3 max-tablet:w-[50%]">
                            <button onClick={() => handleDecrement(quantity)} className="bg-red  text-white font-semibold w-1/4 py-1">-</button>
                            <input type="text" style={{width : '39%'}} className="text-center border-2" value={quantity} readOnly />
                            <button onClick={() => handleIncrement(quantity)} className="bg-red  text-white font-semibold w-1/4 py-1">+</button>
                        </div>


                    </div>
                    <div className="w-1/2 max-tablet:w-full max-tablet:flex max-tablet:justify-start">
                        <button onClick={handleAddCart} className="bg-red rounded text-white font-semibold w-full py-1 max-tablet:text-xs max-tablet:p-2">Add To Cart</button></div>
                </div>
                
                
                <div className="border-t-2 mt-8 pt-5 max-tablet:text-sm">
                    <h3 className="font-semibold max-tablet:text-sm">Description</h3>
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