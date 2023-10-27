import { Link,  useLoaderData  } from "react-router-dom"

export default function addStocks() {
  const data = useLoaderData()
  return (
   <>
      <div className="container w-5/6 mx-auto px-4 sm:px-8 ">
        <div className="py-8">
          <div className="flex justify-between">
            <h2 className="text-2xl font-semibold leading-tight">PRODUCT STOCKS INFO</h2>
            <div className="flex w-[50%] justify-end ">
              <input name="category_name" type="text" placeholder="Search Prouct Here" required className="flex w-[60%] h-10 border-1 border-gray300 shadow-md p-2 pl-3 border-gray-300 bg-gray-100 rounded-tl rounded-bl " />

              <button className="flex w-30 h-10 bg-red text-white font-bold p-2 rounded-tr rounded-br">SEARCH</button>
            </div>
        </div>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr className=" bg-red text-white text-sm ">
                    <th className="px-5 py-3 border-b-2 border-gray-200 text-left uppercase tracking-wider" >PRODUCT NAME</th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 text-center uppercase tracking-wider" >CURRENT STOCKS</th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 text-center uppercase tracking-wider" >OUT BOUND</th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 text-center uppercase tracking-wider" >ACTION</th>
                  </tr>
                </thead>

                <tbody>
                {
                       data.products.map((data, key) => 
                        <tr key={data.id}  className="h-[30px]">
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <div className="flex">
                              <div className="flex-shrink-0 w-10 h-10">
                                <img className="w-full h-full rounded-full" src={data.products_info.thumbnail} alt=""/>
                              </div>

                              <div className="ml-3">     
                                <p className="text-gray-900 whitespace-no-wrap"> {data.name} </p>
                            

                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-center ">
                            <p className="flex w-full p-1  text-red text-xl underline font-bold animate-pulse justify-center ">{(data.inventory.in - data.inventory.out)}</p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="flex w-full text-gray-700 text-xl font-bold justify-center ">{data.inventory.out}</p>
                          </td>
                          <td className="px-1 py-5 border-b border-gray-200 bg-white text-sm justify-center">
                             <div className="flex w-full justify-center">
                                  <span className=" px-3 py-1 font-semibold bg-green-200 rounded-2xl text-green-900 leading-tight" >
                                    <Link  to={`../add_stocks/${data.id}`} >Add stocks</Link>
                                  </span>
                              </div>
                          </td>
                        </tr>
                   )
                }
                  
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

   </>
  )
}
