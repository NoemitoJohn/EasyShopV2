
import { useState } from "react"
import Footer from "../components/Footer"
import { NavLink, useNavigate } from "react-router-dom"
import axios from "axios"

function signup() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPass] = useState('')

  const navigate = useNavigate()

  function handleSubmit(event){
      event.preventDefault()
      axios.post('http://localhost:3000/signup', {firstName, lastName, email, password, repeatPassword})
      // axios.post('https://demolive-api.vercel.app/signup', {firstName, lastName, email, password, repeatPassword})
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
                    <form onSubmit={handleSubmit} className="flex flex-col  w-full ">
                        <span className=" w-full text-center text-2xl font-medium mb-7"><p>SIGN UP ACCOUNT HERE</p></span>
                        <input type="text" name="firstName" placeholder="First Name" className="Log-Input" onChange={e => setFirstName(e.target.value)} />
                        <input type="text" name="lastName" placeholder="Last Name" className="Log-Input" onChange={e => setLastName(e.target.value)} />
                        <input type="email" name="email" placeholder="example@gmail.com" className="Log-Input" onChange={e => setEmail(e.target.value)} />
                        <input type="password" name="password" placeholder="Password" className="Log-Input" onChange={e => setPassword(e.target.value)} />
                        <p className="mb-5 text-gray-500 ml-3">Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters</p>
                        <input type="password" name="repeatPassword" placeholder="Confirm Password" className="Log-Input" onChange={e => setRepeatPass(e.target.value)} />
                        <button className="w-100 bg-red text-white font-semibold mt-5 mb-5 py-2 hover:bg-gray-500"> SIGN UP</button>
                    </form>
                </div>
        </div>   
        <Footer/> 
    </>
  )
}

export default signup