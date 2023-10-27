

export default function shippingAddress() {
  return (
    <>
        <div className="flex  w-full justify-evenly max-laptop:flex-col max-laptop:justify-center max-laptop:items-center">
               
            <div className="flex flex-col h-[300px] w-[45%] max-w-[700px] min-w-[250px] bg-white p-8 rounded shadow-lg max-laptop:mb-10 max-laptop:w-[80%]">
                <div className="w-full flex justify-center item-cecnter text-2xl font-bold text-gray-600 max-minitab:text-base text-center">CURRENT SHIPPING ADDRESS</div>
                <div className="w-full flex justify-center items-center italic font-semibold text-center text-gray-600 mt-10 text-2xl max-minitab:text-base">
                    B2 L3 Ph4 Demo Subd. Brgy. Sample, Test City, Random , Philippines (4024)</div>
                <div className="w-full flex justify-center items-center mt-5"><input type="checkbox" className="flex mr-3"/> <span className="flex text-lg text-sky-600 italic max-minitab:text-base">
                    Check to set as Default Delivery Address</span></div>
            </div>


            <form className="flex flex-col w-[45%] max-w-[700px] min-w-[250px] bg-white p-8 rounded shadow-lg max-laptop:mb-10 max-laptop:w-[80%]">
                <div className="w-full flex justify-center item-cecnter text-2xl font-bold text-gray-600 text-center max-minitab:text-xl max-minitab:mb-3">ADD SHIPPING ADDRESS</div>

                <div className="font-semibold text-gray-500 my-2">Home Address 1:</div>
                <span><input type="text" placeholder="Address Line 1" className="w-full h-9 pl-3 border-1 border-gray-400 bg-gray-100 rounded"/></span>
                
                <div className="font-semibold text-gray-500 my-2">Home Address 2:</div>
                <span><input type="text" placeholder="Address Line 2" className="w-full h-9 pl-3 border-1 border-gray-400 bg-gray-100 rounded"/></span>

                <div className="font-semibold text-gray-500 my-2">City:</div>
                <span><input type="text" placeholder="Enter City" className="w-full h-9 pl-3 border-1 border-gray-400 bg-gray-100 rounded"/></span>

                <div className="font-semibold text-gray-500 my-2">Province/State:</div>
                <span><input type="text" placeholder="Enter province" className="w-full h-9 pl-3 border-1 border-gray-400 bg-gray-100 rounded"/></span>

                <div className="font-semibold text-gray-500 my-2">Country:</div>
                <span><input type="text" placeholder="Enter Country" className="w-full h-9 pl-3 border-1 border-gray-400 bg-gray-100 rounded"/></span>

                <div className="font-semibold text-gray-500 my-2">Zipcode:</div>
                <span><input type="text" placeholder="Zipcode" className="w-full h-9 pl-3 border-1 border-gray-400 bg-gray-100 rounded"/></span>
                <button className="w-full bg-red text-white font-semibold py-2 rounded mt-5">SET ADDRESS</button>
            </form>
         

        </div>
    </>
  )
}
