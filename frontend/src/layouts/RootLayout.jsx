import { NavLink, Outlet, Link } from "react-router-dom"
import logo from "../logo2.png"
import { useEffect } from "react"
import Footer from "../components/Footer"
import { useUserAuthContext } from "../hooks/useUserAuthContext"

export default function RootLayout() {
    const {user, dispatch} = useUserAuthContext()
    
    function handleLogout(){
        localStorage.removeItem('user')

        dispatch({type: 'LOGOUT'})
        
        console.log(user)
    }

  
        return (
    <>
    
    {/* NAVIGATION BAR CONTAINER */}
            <nav className="flex bg-black flex-col ">
            <div className="flex bg-darkgray justify-center h-10 ">
                <nav className="flex  justify-center basis-4/6 item-center">
                    <ul className="flex text-white basis-1/2 h-full items-center  ">
                        <NavLink className="mr-4 Linkhover"  to='/'>Home</NavLink>
                        <NavLink className="mr-4 Linkhover" to='/products'>All Products</NavLink>
                    </ul>
                    <ul>
                    </ul>
                    <ul className="flex text-white basis-1/2 justify-end h-full items-center  ">
                        
                        {user && (
                            <div className="flex">
                                <p className="text-white text-center">{user.email}</p>
                                <button onClick={handleLogout} className="bg-red px-4 py-2 h-10 rounded-sm text-white ">Logout</button>
                            </div>
                        )}
                        {!user && (
                            <div>
                                <NavLink className="mr-4 Linkhover" to='/signup'>Sign up</NavLink>
                                <NavLink className="mr-4 Linkhover" to='/login'>Log in</NavLink>

                            </div>
                        )}
                    </ul>
            
                </nav>
            </div>
            <div className="flex justify-center">
                <div className="flex basis-4/6 justify-center py-4">
                    <div className="basis-2/6 "><img src={logo} alt="logo" className="w-3/4 "></img></div>
                    <div className="flex justify-center basis-4/6">
                        <div className="flex justify-center basis-3/4 items-center ">
                            <form action="/search" method="POST" className="flex w-full h-10 ">
                                <input type="text" className="h-10  basis-5/6 shadow-sm p-2 rounded-tl-3xl rounded-bl-3xl pl-5" placeholder="SEARCH" />
                                <button className="basis-1/6 text-white bg-red rounded-tr-3xl rounded-br-3xl px-5 font-semibold ">SEARCH</button>
                            </form>
                        </div>
                        <div className="flex justify-center items-center basis-1/4  text-white font-semibold  ">
                            <Link to='/cart' className="bg-red px-4 py-2 h-10 rounded-sm">CART</Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    


        
    {/* MAIN CONTENT CONTAINER */}
    <main className="mt-20">
        <Outlet/>
    </main>


    {/* FOOTER CONTAINER */}
    <div className='flex justify-center w-full p-100 bg-black mt-20'>
            <div className='flex w-4/6 flex-col mt-4'>
                <div className='flex flex-row w-full'>
                    <div className='flex flex-row w-1/2'>
                        <div className='flex flex-col w-12 items-center'>
                            <svg className="h-8 w-8 mb-2 mt-5 text-red"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round">  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
                            <svg className="h-8 w-8 mb-2"  viewBox="0 0 24 24"  fill="#AF1B3F" stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round">  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>  
                            <svg className="h-8 w-8 mb-2"  viewBox="0 0 24 24"  fill="#AF1B3F"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round">  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" /></svg>
                            <svg className="h-8 w-8 mb-2 text-red"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round">  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />  <rect x="2" y="9" width="4" height="12" />  <circle cx="4" cy="4" r="2" /></svg>
                        </div>
                        <div className='flex flex-col'>
                            <NavLink to="https://facebook.com" target="_blank"><p className='text-white mb-3 mt-5 ml-5 font-semibold text-xl'>Facebook</p></NavLink>
                            <NavLink to="https://instagram.com" target="_blank"><p className='text-white mb-3 ml-5 font-semibold text-xl'>Instagram</p></NavLink>
                            <NavLink to="https://youtube.com" target="_blank"><p className='text-white mb-3 ml-5 font-semibold text-xl'>Youtube</p></NavLink>
                            <NavLink to="https://linkedin.com" target="_blank"><p className='text-white mb-3 ml-5 font-semibold text-xl'>LinkedIn</p></NavLink>
                        </div>

                    </div>
                    <div className='flex w-1/2 justify-end mt-4'>
                        <div className="flex flex-col w-3/6">
                            <div className="text-white text-xl font-semibold mb-3">Contact Info</div>
                            <div className="text-white text-m font-semibold border-b-2 border-b-red pb-2">Example@gmail.com</div>
                            <div className="text-white text-m font-semibold border-b-2 border-b-red pb-2">0923-265-xxx</div>
                            <div className="text-white text-m font-semibold border-b-2 border-b-red pb-2">National highway Example Address</div>
                        </div>
                    </div>
                </div>
                <div className='flex justify-center w-full py-5'>
                        <div className='flex justify-center flex-col  w-4/6'>
                            <div className='text-red font-extrabold italic text-5xl text-center '>EASYSHOP</div>
                            <p className='text-white text-center italic'> @EASYSHOP2023</p>
                        </div>
                </div>
            </div>
        </div>



    </>
  )
}