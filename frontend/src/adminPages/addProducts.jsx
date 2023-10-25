
import axios from "axios"
import { useEffect, useState } from "react"
import { useLoaderData } from "react-router-dom"

export default function addProducts() {

    const [files, setFiles] = useState([])
    const [name, setName] = useState()
    const [stoks, setStocks] = useState()
    const [price, setPrice] = useState()
    const [categoryId, setCategoryId] = useState()
    const [desc, setDesc] = useState()
    const [isLoading, setLoading] = useState(false)
    const [sproductId, setSProductId] = useState()
    const [sproductName, setSProductName] = useState()
    const categories = useLoaderData()
    
    function handleFileChange(e){
        const fileTemp = [...files]
        
        fileTemp[e.target.id - 1] = e.target.files[0]
        
        setFiles(fileTemp)
        
    }
    
    async function handleUpload(e){
        
        e.preventDefault()
        setLoading(true)
        

        try {
            // console.log(files)
            const fdata = new FormData()
            fdata.append('name', name)
            fdata.append('price', price)
            fdata.append('stoks', stoks)
            fdata.append('cat_id', categoryId)
            fdata.append('description', desc)
            
            for (const file of files) {
                fdata.append('my_file', file)
            }

            const {data} = await axios.post('http://127.0.0.1:3000/api/products', fdata)
            
            setSProductId(data.product_id)
            setSProductName(data.product_name)
            
        } catch (error) {
            setLoading(false)
            console.log(error.message)
        } finally {
            setLoading(false)
        }


    }
    
    return (
        <div className="flex flex-col items-center w-full">

            <div className="flex w-5/6 font-bold  text-xl mb-3 pl-3 "> ADD PRODUCTS </div>

            {/* FORM START HERE */}
            <form onSubmit={handleUpload} className="flex w-5/6 justify-between ">

                <div className="w-[47%] flex flex-col  bg-white p-8 rounded-md shadow-md">

                    {/* PRODUCT NAME START HERE */}
                    <div className="flex flex-col mb-2">
                        <label htmlFor="" className="text-gray-500 mb-1 font-semibold">Product Name :</label>
                        <input name="product_name" type="text" placeholder="Product Name" onChange={(e) => setName(e.target.value)}  className=" shadow-md p-2 pl-3 border-gray-300 bg-gray-100 rounded " />
                    </div>

                    {/* PRODUCT PRICE START HERE */}
                    <div className="flex flex-col mb-2">
                        <label htmlFor="" className="text-gray-500 mb-1 font-semibold">Price :</label>
                        <input name="price"  type="number" step='any' placeholder="00.00" onChange={(e) => setPrice(e.target.value)} className=" shadow-md p-2 pl-3 border-gray-300 bg-gray-100 rounded " />
                    </div>
                    <div className="flex flex-col mb-2">
                        <label htmlFor="" className="text-gray-500 mb-1 font-semibold">Stoks :</label>
                        <input name="price"  type="number" step='any' placeholder="00" onChange={(e) => setStocks(e.target.value)} className=" shadow-md p-2 pl-3 border-gray-300 bg-gray-100 rounded " />
                    </div>

                    <div className="flex flex-col mb-2">
                        <label htmlFor="" className="text-gray-500 mb-1 font-semibold">Category :</label>

                        <fieldset>
                            <div className="relative text-gray-800 bg-white shadow-sm">
                                <label htmlFor="frm-whatever" className="sr-only">My field</label>
                                <select name="whatever" onChange={(e) => setCategoryId(e.target.value)} id="frm-whatever" className="appearance-none w-full bg-gray-100  shadow-md font-semibold py-2 px-4 rounded inline-flex justify-stat items-center" >
                                    <option value="" className="hidden">Please choose&hellip;</option>
                             {
                              categories.map((data =>
                                <option key={data.id} value={data.id} className="text-gray-900">{data.name}</option>
                                ))
                             }
                              <option value="1" className="text-gray-900">Others..</option>
                                </select>
                                <div className="pointer-events-none absolute right-0 top-0 bottom-0 flex items-center px-2 text-gray-700 border-l">
                                    <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                    </svg>
                                </div>
                            </div>
                      </fieldset>

                    </div>

              

                    {/* UPLOAD IMAGES START HERE ------------------------------IMAGES---------------------------- */}
                    <div className="flex flex-col mb-2">
                        <label htmlFor="" className="text-gray-500 mb-1 font-semibold">Images 1 :</label>
                        <input id="1" onChange={handleFileChange} type="file" className="block w-full p-2 text-sm text-gray-900 rounded-md shadow-md cursor-pointer bg-gray-100 " />
                    </div>

                    <div className="flex flex-col mb-2">
                        <label htmlFor="" className="text-gray-500 mb-1 font-semibold">Images 2 :</label>
                        <input id="2" onChange={handleFileChange} type="file" className="block w-full p-2 text-sm text-gray-900 rounded-md shadow-md cursor-pointer bg-gray-100 " />
                    </div>

                    <div className="flex flex-col mb-2">
                        <label htmlFor="" className="text-gray-500 mb-1 font-semibold">Images 3 :</label>
                        <input id="3" onChange={handleFileChange} type="file" className="block w-full p-2 text-sm text-gray-900 rounded-md shadow-md cursor-pointer bg-gray-100 " />
                    </div>

                    <div className="flex flex-col mb-2">
                        <label htmlFor="" className="text-gray-500 mb-1 font-semibold">Images 4 :</label>
                        <input id="4" onChange={handleFileChange} type="file" className="block w-full p-2 text-sm text-gray-900 rounded-md shadow-md cursor-pointer bg-gray-100 " />
                    </div>



                </div>


                <div className="w-[47%] h-[380px] flex flex-col  bg-white p-5 rounded-md shadow-md">

                    <div className="flex flex-col mb-2">
                        <label htmlFor="" className="text-gray-500 mb-1 font-semibold">Product Description :</label>


                        {/* PRODUCT DESCRIPTION TEXTAREA START HERE */}
                        <div className="mt-2 ">
                            <textarea
                                onChange={(e) => setDesc(e.target.value)}
                                id="about"
                                name="product_desc"
                                rows={3}
                                className=" shadow-md p-2 pl-3 h-[200px] border-gray-300 bg-gray-100 rounded block w-full border-0 py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                defaultValue={''}
                            />
                        </div>
                        <p className="mt-1 pl-1 text-sm leading-6 text-gray-600">Write a few sentences about the products.</p>

                    </div>
                        {sproductId && 
                            <a href={`http://localhost:5173/product/${sproductId}`} className="text-center" target="_blank" rel="noopener noreferrer">{`${sproductName} Created. View here.`} </a>
                        }
                    
                    <div className="flex flex-col justify-center items-center mt-5">
                        <button className="w-[50%] bg-gray-500 text-white font-bold py-2 rounded-md">{isLoading ? (<>Loading...</>) : (<>Add Product</>)}</button>
                    </div>

                </div>




            </form>
            {/* FORM END HERE */}


        </div>
    )
}