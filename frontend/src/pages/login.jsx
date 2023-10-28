import { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useLogin } from "../hooks/useLogin"
import { UserAuthContext } from "../context/UserAuthContext"

function login() {
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {login, error, isLoading} = useLogin()
  const {user} =  useContext(UserAuthContext)
  // const [error, setError] = useState('')
  const navigate = useNavigate()

  
  useEffect(()=>{
    if(user){
      navigate('/')
    }
  },[user])



  async function handleSubmit(event){
    
    event.preventDefault()
    
    await login(email,password)
    navigate('/')
  }

  return (
    
    <>
        <div className="flex justify-center w-full mt-20 p-5">    
                <div className="flex w-[60%] max-w-[500px] min-w-[300px]  py-5 px-10 bg-white shadow-lg">
                    <form  onSubmit={handleSubmit} className="flex flex-col  w-full ">
                        <span className=" w-full text-center text-2xl font-medium mb-7"><p>LOG IN ACCOUNT HERE</p></span>
                        <input type="text" name="username" placeholder="example@gmail.com" className="Log-Input" onChange={ e=> setEmail(e.target.value)} />
                        <input type="password" name="password" placeholder="********" className="Log-Input" onChange={e => setPassword(e.target.value)} />
                        {error && <p>{error}</p>}
                        <button disabled={isLoading} className="w-100 bg-red text-white font-semibold mt-5 py-2 hover:bg-gray-500"> LOG IN</button>
                        <p className="w-full text-center mt-3 mb-3">Don't have an account? <Link to="/signup" className="text-red font-bold">Sign Up</Link></p>
                    </form>
                </div>
        </div>    
    </>
  )
}

export default login
