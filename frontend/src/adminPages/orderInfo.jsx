
export default function orderInfo() {
  return (
    <>
        <div className="w-full flex">
            <div className="flex flex-col w-[55%] ml-5 p-5">
            <div className="flex w-full bg-red text-white font-bold p-2 rounded-t-md">
                        <div className="flex justify-center items-center w-[45%]">Product name</div>
                        <div className="flex justify-center items-center w-[15%]">Product Id</div>
                        <div className="flex justify-center items-center w-[15%]">Quantity</div>
                        <div className="flex justify-center items-center w-[25%]">Action</div>
                    </div>


                    <div className="w-full overflow-y-scroll h-[600px] bg-white">


                        <div className="flex w-full py-2 border-b-1 border-gray-300">
                            <div className="flex justify-center items-center w-[45%] px-3">IPhone XXL Pro Super Max</div>
                            <div className="flex justify-center items-center w-[15%] px-3">3</div>
                            <div className="flex justify-center items-center w-[15%] px-3">3</div>
                            <div className="flex justify-center items-center w-[25%]">
                            
                                    <span className=" inline-block px-3 py-1  text-sm font-semibold bg-green-200 rounded-2xl text-green-900 leading-tight mr-2">
                                        Product Details
                                    </span>
                                
                            </div>
                        </div>


                    </div>
                    <div className="flex w-full bg-red text-white font-bold p-2 rounded-b-md h-10"></div>

            </div>


            <div className="flex flex-col w-[40%] p-5">
                 <div className="flex flex-col w-full shadow-md mb-5">
                    <div className="flex justify-center w-full bg-red text-white font-bold py-2 rounded-t-md">ORDER INFO</div>
                    <div className="w-full bg-white rounded-b-md p-5">
                        <div className="w-full  ml-5">Account Name : <span className="font-semibold italic ml-2">Juan Dela Cruz</span></div>
                        <div className="w-full  ml-5">Payment Status : <span className="font-semibold italic ml-2">Paid via Card / Cash on Delivery</span></div>
                        <div className="w-full  ml-5">Total Quantity : <span className="font-semibold italic ml-2">10</span></div>
                        <div className="w-full  ml-5">Total Price : <span className="font-semibold italic ml-2 text-red">&#8369; 12,999.00</span></div>
                        <div className="w-full  ml-5">Order Date : <span className="font-semibold italic ml-2 text-green-500">October 24, 2023</span></div>
                        <div className="w-full  ml-5">Transaction Id : <span className="font-semibold italic ml-2">000123ASDJ236999</span></div>
                    </div>
                </div>
                 <div className="flex flex-col w-full shadow-md mb-5">
                    <div className="flex justify-center w-full bg-red text-white font-bold py-2 rounded-t-md">SHIPPING INFORMATION</div>
                    <div className="flex flex-col w-full bg-white rounded-b-md p-5">
                        <span className="w-full">Shipping Address :</span>
                        <span className="w-full pl-5 font-bold italic text-gray-600">B5 L2 Ph1 BAGONG SUBD. Brgy. Tibay, Tigbak City, Manila</span>
                    </div>
                </div>
                 <div className="flex flex-col w-full shadow-md mb-5">
                    <div className="flex justify-center w-full bg-red text-white font-bold py-2 rounded-t-md">UPDATE STATUS</div>
                    <div className="w-full bg-white rounded-b-md p-3 pb-5">
                        <div className="ml-3 my-5">Current Status : <span className="font-semibold italic pl-4">OUT OF DELIVERY</span></div>
                        
                        <div className="w-[95%] border-t-1  border-gray-700 ml-3 pt-3">Select Status :</div>
                        <form class="w-[80%] ml-[10%] mt-3">
                            <fieldset>
                                    <div class="relative border border-gray-300 text-gray-800 bg-white shadow-lg">
                                        <label for="frm-whatever" class="sr-only">My field</label>
                                        <select class="appearance-none w-full py-1 px-2 bg-white" name="whatever" id="frm-whatever">
                                            <option value="">Please choose&hellip;</option>
                                            <option value="1">To Pack</option>
                                            <option value="2">Packed</option>
                                            <option value="3">Out for Delivery</option>
                                            <option value="3">Delivered</option>
                                            <option value="3">Cancel</option>
                                            <option value="3">Returned</option>
                                        </select>
                                        <div class="pointer-events-none absolute right-0 top-0 bottom-0 flex items-center px-2 text-gray-700 border-l">
                                            <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                            </svg>
                                        </div>
                                    </div>
                            </fieldset>
                            <button className="w-[80%] ml-[10%] mt-4 bg-gray-400 rounded-md text-white py-2 font-semibold ">UPDATE</button>
                        </form>
                    </div>
                </div>
            </div>

            

        </div>
    
    </>
  )
}
