
import Footer from "../components/Footer"
import { NavLink } from "react-router-dom"
function signup() {
  return (
    <>

        <div className="flex justify-center w-full mt-20 ">    
                <div className="flex w-1/3  py-5 px-10 bg-white shadow-lg">
                    <form className="flex flex-col  w-full ">
                        <span className=" w-full text-center text-2xl font-medium mb-7"><p>SIGN UP ACCOUNT HERE</p></span>
                        <input type="text" name="firstname" placeholder="First Name" className="Log-Input"/>
                        <input type="text" name="lastname" placeholder="Last Name" className="Log-Input"/>
                        <input type="email" name="lastname" placeholder="example@gmail.com" className="Log-Input"/>
                        <input type="password" name="password" placeholder="Password" className="Log-Input"/>
                        <p className="mb-5 text-gray-500 ml-3">Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters</p>
                        <input type="password" name="confirm-pass" placeholder="Confirm Password" className="Log-Input"/>
                        <button className="w-100 bg-red text-white font-semibold mt-5 mb-5 py-2 hover:bg-gray-500"> SIGN UP</button>
                    </form>
                </div>
        </div>   
        <Footer/> 
    </>
  )
}

export default signup