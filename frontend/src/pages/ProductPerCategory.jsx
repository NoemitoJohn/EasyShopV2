import { useLoaderData, useNavigate, useParams, Link } from "react-router-dom"

export default function ProductPerCategory() {
            const { name } = useParams()
        const productsPerCategory= useLoaderData()
  return (
    <>
    
     <div className="flex w-100 justify-center flex-col">
        
        <h2 className="w-full flex justify-center text-3xl text-gray-500 mb-5 max-minitab:text-lg">All products from <span className="ml-3 italic font-semibold">{name}</span></h2>
        <div className="flex flex-wrap justify-center  mt-3 w-full  XSmobile:w-[100%] desktop:px-20" >
            
            
        {
            productsPerCategory.map( data =>(
              <div key={data.id} className="flex m-1 flex-col p-2 w-[250px] border-gray-300 border-1 shadow-lg hover:border-red bg-white max-mobile:w-[120px] max-MDmobile:w-[160px]" >
                  <Link to={`../product/${data.id}`}><div className="w-full  h-[150px] min-[650px]:h-[200px] "><img src={data.thumbnail} alt="" className="w-full h-full " /></div></Link>
                  <div className="w-100 h-12 text-base max-minitab:text-xs ">{data.name}</div>
                  <div className="w-100 text-sm text-red font-bold">P {new Intl.NumberFormat().format(data.price)}.00 </div>
                  <div className="w-100"></div>
              </div>
            ))
            }
        </div>
     </div>

    </>
  )
}
