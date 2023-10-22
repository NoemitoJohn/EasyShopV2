import { useLoaderData, useParams } from "react-router-dom"


export default function productInfo() {
    const { id } = useParams()
    const productInfo = useLoaderData()
    return (
    <div className="grid justify-items-stretch pt-10">
        <div className="flex justify-self-center space-x-4 w-4/6  p-5">
            <div className="flex justify-center items-center w-1/2 rounded bg-white shadow-lg p-2">
               
                <div className="flex justify-center items-center w-full h-full bg-gray-300 rounded text-4xl text-gray-500 font-bold">Product Image</div>
            </div>


            <div className="flex flex-col w-1/2 bg-white rounded p-10 shadow-lg ">
                <div className="w-full text-2xl font-semibold">{productInfo.name} </div>
                <div className="mt-2">Ratings: {productInfo.rating} </div>
                <div className="mb-8 border-b-2 pb-3">Stocks : {productInfo.stocks} </div>
                <div className="mb-8 w-full text-4xl font-bold"> &#x20B1; {productInfo.price}.00</div>

                <div className="flex w-full space-x-4">
                    <input className="w-1/2 rounded border-2  pl-4 pr-2"  type="number"  value="1" max="<%= product.stock %>" id="quantity" name="quantity" />
                    <div className="w-1/2"><button className="bg-red rounded text-white font-semibold w-full py-1">Add To Cart</button></div>
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
