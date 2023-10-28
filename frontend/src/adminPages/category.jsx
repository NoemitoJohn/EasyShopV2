

import axios from "axios";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";


export default function category() {
  const categories = useLoaderData()
  const [catAdd, setCatAdd] = useState('')
  const [catId, setCatId] = useState()
  const [catUpdate, setCatUpdate] = useState('')
  //TODO: add context provider for dynamic updates
  const clean = () =>{
    setCatAdd('')
    setCatUpdate('')
  }
  
  async function handleAddSubmit(e){
    e.preventDefault()
    try {
      const {data} = await axios.post(`${import.meta.env.VITE_BACK_END_API}/api/admin/category`, { cat : catAdd })
    
      clean()
    } catch (error) {
        console.log(error.response.data)
    }
    
  }

  async function handleUdpateSubmit(e){
    e.preventDefault()
    try {
      //TODO: change url to production
      const {data} = await axios.patch('http://127.0.0.1:3000/api/admin/category', { id : catId,  cat : catUpdate })
      clean()  
    } catch (error) {
        console.log(error.response.data)
    }

  }

  return (
   <> 
    
    <div className="flex w-[100%]">
       
      <div className="w-[100%]  flex flex-col fixed ">
         
          <div className="w-[30%] ml-[10%] shadow-md rounded-lg overflow-hidden">

            <table className="w-[100%] leading-normal">
              <thead>
                <tr className=" bg-red text-white text-sm ">
                  <th className="px-5 py-3 border-b-2 border-gray-200 text-lg font-bold  uppercase tracking-wider text-center"> ADD NEW CATEGORY</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td className="border-gray-200 bg-white text-sm h-[200px] flex justify-center">
                  <div className="w-[90%] mt-8">

                   
                   {/* ADD NEW CATEGORY FORM START HERE */} 
                     <form onSubmit={handleAddSubmit} className="flex flex-col mb-2 ">
                        <label htmlFor="" className="text-gray-500 mb-3 font-semibold">CATEGORY NAME :</label>

                        <input name="category_name" onChange={(e) => setCatAdd(e.target.value)} value={catAdd} type="text" placeholder="Enter category name" required className="h-10 shadow-md p-2 pl-3 border-gray-300 bg-gray-100 rounded " />

                        <button className="w-full bg-gray-500 text-white font-bold py-2 rounded mt-5">Add Category</button>
                      </form>

                    </div>
                  </td>
                
                </tr>
        
              </tbody>
            </table>

          </div>

          

          
        {/* UPDATE CATEGORY START HERE */} 
          <div className="w-[30%] ml-[10%] mt-20 shadow-md rounded-lg overflow-hidden">

            <table className="w-[100%] leading-normal">
              <thead>
                <tr className=" bg-red text-white text-sm ">
                  <th className="px-5 py-3 border-b-2 border-gray-200  text-lg font-bold uppercase tracking-wider text-center"> UPDATE CATEGORY</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td className="border-gray-200 bg-white text-sm h-[300px] flex justify-center">
                  <div className="w-[90%] mt-8">
                    
                   {/* UPDATE CATEGORY FORM START HERE */} 
                     <form onSubmit={handleUdpateSubmit} className="flex flex-col mb-2 ">

                        <label htmlFor="" className="text-gray-500 mb-3 font-semibold">SELECT CATEGORY :</label>
                        
                        <fieldset>
                            <div className="relative text-gray-800 bg-white shadow-sm">

                                <select onChange={(e) => setCatId(e.target.value)} name="whatever" id="frm-whatever" className="appearance-none w-full bg-gray-100  shadow-md font-semibold py-2 px-4 rounded inline-flex justify-stat items-center" >
                                    <option value="" className="hidden">Please choose&hellip;</option>
                              
                              
                              {/* MAP SELECT THE CATEGORY TO BE UPDATED */}
                                {
                                  categories.map((data =>
                                    <option value={data.id} className="text-gray-900">{data.name}</option>
                                    ))
                                }
                             
                                </select>
                                <div className="pointer-events-none absolute right-0 top-0 bottom-0 flex items-center px-2 text-gray-700 border-l">
                                    <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                    </svg>
                                </div>
                            </div>
                      </fieldset>
                        
                        <label htmlFor="" className="text-gray-500 mb-3 font-semibold mt-5">INPUT NEW CATEGORY NAME :</label>
                        <input onChange={(e) => setCatUpdate(e.target.value)} value={catUpdate} type="text" placeholder="Enter category name" required className=" h-10 shadow-md p-2 pl-3 border-gray-300 bg-gray-100 rounded " />
                        <button className="w-full bg-gray-500 text-white font-bold py-2 rounded mt-8">Update Category</button>
                      </form>
                    </div>
                  </td>
                
                </tr>
        
              </tbody>
            </table>

          </div>


            

            
      </div>

        
                              
        {/* CATEGORY LIST START HERE */}

      <div className="flex justify-end w-[100%] pr-[20%] px-4 ">
            <div className="w-[30%]">
             
                <div className="-mx-4 sm:-mx-8 px-4 overflow-y-auto">
                
                  <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">

                    <table className="min-w-full leading-normal">
                      <thead>
                        <tr className=" bg-red text-white text-sm ">
                          <th className="px-5 py-3 border-b-2 border-gray-200 text-lg font-bold uppercase tracking-wider text-center"> CATEGORY LIST</th>
                        </tr>
                      </thead>

                      <tbody>

                    
                   {/* MAP CATEGORY LIST START HERE */}
                    {
                      categories.map((data, i)=>(
                        <tr key={i}>
                          <td className="p-2 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap pl-5 text-[18px]">{data.name}</p>
                          </td>
                        
                        </tr>
                      ))
                    }
                      </tbody>
                    </table>

                  </div>
                </div>
            </div>
         </div>




            
           

    </div>
        

</>
  )
}
