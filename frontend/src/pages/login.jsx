import { useState } from "react"
import Footer from "../components/Footer"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"

function login() {
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  function handleSubmit(event){
    event.preventDefault()

    axios.post('http://localhost:3000/login', {email, password})
    // axios.post('https://demolive-api.vercel.app/login', {email, password}) 
    .then(res=>{
      console.log(res)
      navigate('/')
    }).catch(err =>{
        console.log(err)
    })
  }

  return (
    
    <>
        <div className="flex justify-center w-full mt-20 ">    
                <div className="flex w-1/3  py-5 px-10 bg-white shadow-lg">
                    <form  onSubmit={handleSubmit} className="flex flex-col  w-full ">
                        <span className=" w-full text-center text-2xl font-medium mb-7"><p>LOG IN ACCOUNT HERE</p></span>
                        <input type="text" name="username" placeholder="example@gmail.com" className="Log-Input" onChange={ e=> setEmail(e.target.value)} />
                        <input type="password" name="password" placeholder="********" className="Log-Input" onChange={e => setPassword(e.target.value)} />
                        
                        <button className="w-100 bg-red text-white font-semibold mt-5 py-2 hover:bg-gray-500"> LOG IN</button>
                        <p className="w-full text-center mt-3 mb-3">Don't have an account? <Link to="/signup" className="text-red font-bold">Sign Up</Link></p>
                    </form>
                </div>
        </div>    
        <Footer />
    </>
  )
}

export default login