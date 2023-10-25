import { useState } from "react"
import logo from "../logo2.png"

export default function adminLogin() {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  function handleSubmit(){
    
  }

  return (

    <div className="BrickBackground flex flex-col  w-full h-screen items-center p-20">
        
        <div className="flex flex-col w-[50%] justify-center items-center  mb-5 text-2xl  ">
          
            <img src={logo} alt="" className="w-[60%]" />
            <p className="italic font-bold text-gray-500 font-sans"> WELCOME TO ADMIN LOGIN PANEL</p>
        </div>
        
        <div className="flex flex-col w-[50%] h-full mt-10 items-center">
            <div className="flex flex-col w-[70%] py-12 bg-red rounded-md shadow-xl p-10">
                <div className="flex w-full justify-center text-white font-bold text-xl mb-4"><p className="">LOGIN HERE</p></div>
                <div className="">
                        <input type="text"   placeholder="Username" className="w-full h-10 border-2 bg-white border-none rounded-md pl-3 mb-5 text-red font-semibold"  />
                        <input type="password"   placeholder="********" className="w-full h-10 border-2 bg-white border-none rounded-md pl-3 mb-5 text-red font-semibold" />
                        <button className="w-full h-10 bg-blue-500 text-white rounded font-semibold">LOG IN</button>
                </div>
                <div className=""></div>
            </div>
        </div>
    </div>
  )
}
