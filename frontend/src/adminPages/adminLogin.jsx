import { useContext, useEffect, useState } from "react"
import logo from "../logo2.png"
import { AdminAuthContext } from "../context/AdminAuthContext"
import axios from "axios"
import { useNavigate } from "react-router-dom"
export default function adminLogin() {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const navigate = useNavigate()
  const {dispatch, admin} = useContext(AdminAuthContext)


  useEffect(()=> {
    if(admin){
      navigate('/admin/dashboard')
    }
  },[admin])



  async function handleSubmit(){

    try{
      const {status, data} = await axios.post(`${import.meta.env.VITE_BACK_END_API}/api/admin`, {email, password})
      
      if(status == 200){
        //TODO: remove user credential from the storage first!
        const admin = {email: data.email, token : data.token}
        dispatch({type: 'LOGIN', payload : data})
        localStorage.setItem('admin', JSON.stringify(data))
      }

    } catch(error){
      console.log(error)
    } 
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
                        <input type="text" onChange={(e) => setEmail(e.target.value)} placeholder="Username" className="w-full h-10 border-2 bg-white border-none rounded-md pl-3 mb-5 text-red font-semibold"  />
                        <input type="password" onChange={(e) => setPassword(e.target.value)}   placeholder="********" className="w-full h-10 border-2 bg-white border-none rounded-md pl-3 mb-5 text-red font-semibold" />
                        <button onClick={handleSubmit} className="w-full h-10 bg-blue-500 text-white rounded font-semibold">LOG IN</button>
                </div>
                <div className=""></div>
            </div>
        </div>
    </div>
  )
}
