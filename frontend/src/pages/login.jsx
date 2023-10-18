import Footer from "../components/Footer"
import { Link } from "react-router-dom"
function login() {
  return (
    
    <>
        <div className="flex justify-center w-full mt-20 ">    
                <div className="flex w-1/3  py-5 px-10 bg-white shadow-lg">
                    <form className="flex flex-col  w-full ">
                        <span className=" w-full text-center text-2xl font-medium mb-7"><p>LOG IN ACCOUNT HERE</p></span>
                        <input type="text" name="username" placeholder="example@gmail.com" className="Log-Input"/>
                        <input type="password" name="password" placeholder="********" className="Log-Input"/>
                        
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