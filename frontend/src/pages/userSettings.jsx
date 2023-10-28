

export default function userSettings() {
  return (
   <>
        <div className="w-full flex flex-col justify-center items-center mb-10 ">
                <div className="w-[35%] min-w-[300px] flex flex-col shadow-md rounded-br-lg  rounded-bl-md desktop:w-[40%] laptop:w-[60%] notebook:w-[80%] tablet:w-[80%] XSmobile:w-[90%] ">
                    <div className="w-full flex justify-center items-center bg-red text-white py-2 font-semibold rounded-tr-md rounded-tl-md">ACCOUNT INFORMATION</div>
                    <div className="w-full flex items-center flex-col  bg-white text-white p-1 pb-10 rounded-br-lg  rounded-bl-md">
                        <div className="w-full h-12 text-gray-400 font-semibold pl-5 pt-5">Email : <span className="text-gray-800 italic pl-4">sample@sample.com</span></div>
                        <div className="w-full h-12 text-gray-400 font-semibold pl-5 pt-5">Full Name : <span className="text-gray-800 italic pl-4">Aljon Manozo</span></div>
                    </div>
                  
                       
            
                </div>
        </div>
        <div className="w-full flex flex-col justify-center items-center mb-10">
                <div className="w-[35%] min-w-[300px] flex flex-col shadow-md desktop:w-[40%] laptop:w-[60%] notebook:w-[80%] tablet:w-[80%] XSmobile:w-[90%] ">
                    <div className="w-full flex justify-center items-center  text-gray-500 bg-white text-xl py-4 font-semibold rounded-tr-md rounded-tl-md ">CHANGE EMAIL</div>
                    <form className="w-full flex flex-col justify-center items-center bg-white text-white p-3 rounded-br-lg  rounded-bl-md">
                            <input type="text" placeholder="New Email" className="w-[80%] border-1 border-gray-400 rounded-sm h-10 pl-4" />
                            <input type="password" placeholder="Password" className="w-[80%] border-1 border-gray-400 rounded-sm h-10 pl-4 mt-5" />
                            <button className="w-[80%] bg-red py-1 rounded-md mb-5 h-10 font-semibold mt-5">UPDATE EMAIL</button>
                    </form>
                </div>
        </div>
        <div className="w-full flex flex-col justify-center items-center ">
                <div className="w-[35%] min-w-[300px] flex flex-col shadow-md desktop:w-[40%] laptop:w-[60%] notebook:w-[80%] tablet:w-[80%] XSmobile:w-[90%] ">
                <div className="w-full flex justify-center items-center  text-gray-500 bg-white text-xl py-4 font-semibold rounded-tr-md rounded-tl-md ">CHANGE PASSWORD</div>
                    <form className="w-full flex flex-col justify-center items-center bg-white text-white p-3 rounded-br-lg  rounded-bl-md">
                            <input type="text" placeholder="New Email" className="w-[80%] border-1 border-gray-400 rounded-sm h-10 pl-4" />
                            <input type="password" placeholder="Password" className="w-[80%] border-1 border-gray-400 rounded-sm h-10 pl-4 mt-5" />
                            <button className="w-[80%] bg-red py-1 rounded-md mb-5 h-10 font-semibold mt-5">UPDATE PASSWORD</button>
                         
                    </form>
                </div>
        </div>
   </>
  )
}
