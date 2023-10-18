import { useEffect, useState } from "react"
import axios from 'axios';
import Footer from "../components/Footer"
function products() {
  const [products, setProducts] = useState([])

  useEffect(()=>{
    //dont change the api link even if the domain is replace
    axios.get('https://ec-shop-api.vercel.app/products')
    .then(res => setProducts(res.data))
    .catch(err => console.log(err))
  },[])

  return (
    <>
    <div className="flex w-100 justify-center">
        <div className="flex flex-wrap justify-center w-4/6 mt-5">
        {
            products.map((data, i)=>(
              <div className="flex w-1/6 m-1 flex-col p-2 border-gray-300 border-1 shadow-lg hover:border-red">
                  <div className="w-100 bg-gray-300 pt-40 pb-10"><img src={data.thumbnail} alt="" /></div>
                  <div className="w-100 h-12 text-sm">{data.name}</div>
                  <div className="w-100 text-sm">P {data.price}.00 </div>
                  <div className="w-100"><button className="w-full py-2 text-white font-semibold bg-red">Add to Cart</button></div>
              </div>




              // <tr key={i} >
              //     <td className="font-xl">{data.name}</td>
              //     <td>P {data.price}.00 </td>
              //     <td>&nbsp;</td>
              //     <td> {data.rating}</td>
              // </tr>
            ))
        }
        </div>
     </div>
    
            <Footer />
    </>
  )
}


export default products
