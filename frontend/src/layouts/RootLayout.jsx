import { NavLink, Outlet, Link, useLoaderData } from "react-router-dom"
import logo from "../logo2.png"
import { useUserAuthContext } from "../hooks/useUserAuthContext"
import React, {useState, useEffect, useRef} from 'react';

export default function RootLayout() {
const categories = useLoaderData()

    
  const [open1, setOpen1] = useState(false);

  let menuRef1 = useRef();

  useEffect(() => {
    let handler = (e)=>{
      if(!menuRef1.current.contains(e.target)){
        setOpen1(false);
      }      
    };

    document.addEventListener("mousedown", handler);
    

    return() =>{
      document.removeEventListener("mousedown", handler);
    }

  });
  
  const [open, setOpen] = useState(false);

  let menuRef = useRef();

  useEffect(() => {
    let handler = (e)=>{
      if(!menuRef.current.contains(e.target)){
        setOpen(false);
      }      
    };

    document.addEventListener("mousedown", handler);
    

    return() =>{
      document.removeEventListener("mousedown", handler);
    }

  });




  let menuSearchRef = useRef();
  const [openSearch, setOpenSearch] = useState(false); 
  useEffect(() => {
    let handler = (e)=>{
      if(!menuSearchRef.current.contains(e.target)){
        setOpenSearch(false);
      }      
    };

    document.addEventListener("mousedown", handler);
    

    return() =>{
      document.removeEventListener("mousedown", handler);
    }

  });

  

  let menuUserRef = useRef();
  const [openUser, setOpenUser] = useState(false); 
  useEffect(() => {
    let handler = (e)=>{
      if(!menuUserRef.current.contains(e.target)){
        setOpenUser(false);

      }      
    };
    document.addEventListener("mousedown", handler);
    

    return() =>{
      document.removeEventListener("mousedown", handler);
    }

  });






    const {user, dispatch} = useUserAuthContext()
    
    function handleLogout(){
        localStorage.removeItem('user')

        dispatch({type: 'LOGOUT'})
        
        console.log(user)
    }

  
        return (
    <>
    
    {/* NAVIGATION BAR CONTAINER */}
            <nav className="flex text-lg bg-black flex-col h-[160px] top-0 w-full fixed z-[2]">
            <div className="flex bg-darkgray justify-center h-10 ">
                <nav className="flex  justify-center w-[85%] item-center laptop:w-[80%]">
                    <ul className="flex text-white basis-1/2 h-full items-center max-mobile:text-xs  ">
                        <NavLink className="mr-4 Linkhover max-minitab:hidden "  to='/'>Home</NavLink>
                        <NavLink className="mr-4 Linkhover" to='/products'>All Products</NavLink>
                    </ul>
                   
                    <ul className="flex text-white basis-1/2 justify-end h-full items-center  ">
                        <div className="flex">
                                <p className="text-white text-center"></p>
                                
                            </div>
                 
                 {/*  USERS SETTINGS / DROPDOWN   */} 
                        {user && (
                
                <div className='menu-container' ref={menuUserRef}>
                <div className='menu-trigger justify-center flex flex-col items-center' onClick={()=>{setOpenUser(!openUser)}}>                
                         <div className="px-3.5 p-2 pt-3 h-10 rounded-sm mx-2 hover:animate-pulse max-mobile:text-xs max-minitab:w-full">My Account &#x2B9F;</div>                              
                </div>
                <div className={`dropdown-Usermenu ${openUser? 'active' : 'inactive'} bg-white w-[300px] text-gray-700`} >
            
                <ul className="flex flex-wrap w-full">
                        <div className="w-full">
                          <div className="flex w-full text-sm mb-1 bg-red text-white p-2 pl-4  ">{user.email}</div>
                          <NavLink to='/account-settings' className="flex w-full text-sm mb-1 p2 pl-4  hover:font-bold">User Settings</NavLink>
                          <NavLink to='/shipping-address' className="flex w-full text-sm mb-1 p2 pl-4 hover:font-bold">Delivery Address</NavLink>
                          <button onClick={handleLogout} className="flex w-full text-sm mb-1 py-2 pl-4 border-t-1 border-gray-500 hover:font-bold">Logout</button>
                        </div>
          
                 </ul>
                </div>
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
            <div className="flex justify-center w-[100%]">
                <div className="flex w-[85%] justify-between py-4 laptop:w-[80%] ">
                    <div className=" max-minitab:w-full max-minitab:flex max-minitab:justify-center "><img src={logo} alt="logo" className="w-[300px]"/></div>
                    <div className="flex  bg-black basis-4/6 max-minitab:justify-start  max-desktop:z-[60] max-desktop:justify-end laptop:justify-start max-minitab:absolute max-minitab:top-[150px] max-minitab:w-full max-minitab:right-0">

                      {/*  FULL SEARCH BAR   */}
                        <div className="hidden items-center w-full ml-10 laptop:flex">
                            <form action="/search" method="POST" className="flex w-full h-10">
                                <input type="text" className="h-10  w-[80%] shadow-sm p-2 rounded-tl-sm rounded-bl-sm pl-5" placeholder="SEARCH" />
                                <button className="basis-1/6 flex text-white bg-red rounded-tr-sm rounded-br-sm px-5 font-semibold justify-center items-center "> SEARCH </button>
                               
                            </form>
                            <div className="flex flex-col justify-center items-center ">
                                <Link to='/cart' className="bg-red px-3.5 p-2 h-10 rounded-sm mx-2 mt-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" className="bi bi-cart-fill" viewBox="0 0 16 16">
                                        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                                    </svg>
                                </Link>
                                <p className="font-bold text-xs text-white">CART</p>
                            </div>
                            
                                            
                            
                            <div className='menu-container ' ref={menuRef1}>
                                    <div className='menu-trigger justify-center flex flex-col items-center mt-4 ' onClick={()=>{setOpen1(!open1)}}>
                                            
                                            <div className="bg-red px-3.5 p-2 h-10 rounded-sm mx-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="25" fill="white" class="bi bi-list-ul" viewBox="0 0 16 16">
                                                <path fill-rule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm-3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                                            </svg>
                                            
                                            </div>    
                                            
                                             <p className="font-bold text-xs text-white">CATEGORY</p>
                                                
                                                
                                    </div>
                                    <div className={`dropdown-menu  ${open1? 'active' : 'inactive'} bg-red mt-[20px] max-minitab:mt-[10px] max-laptop:mt-[28px]`} >
                                
                                    <ul className="flex flex-wrap w-full capitalize">
                                    {
                                        categories.map((data =>
                                            <div className="" key={data.id}>
                                            <Link to={`category/${data.name}`} key={data.id} className="flex w-[160px] text-lg mb-1 "><DropdownItem text = {data.name}/></Link>
                                            </div>
                                    ))}
                                     </ul>
                                    </div>
                                </div>
                        </div>
                        

                        
                    {/* HIDDEN CATEGORY / VISIBLE WHEN CLICK   */}
                        <div className="flex justify-center items-center   max-minitab:w-full  text-white font-semibold text-[10px]  max-minitab:justify-evenly  laptop:hidden  max-minitab:top-[140px] max-minitab:pb-4">
                            <div className="flex flex-col justify-center items-center minitab:hidden">
                                <Link to='/' className="bg-red px-3.5 p-2 h-10 rounded-sm mx-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="25" fill="currentColor" class="bi bi-house-door-fill" viewBox="0 0 16 16">
                                      <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5Z"/>
                                    </svg>
                                </Link>
                                <p className=" font-bold">HOME</p>
                            </div>
                           
                           
                           <div className="flex flex-col justify-center items-center ">
        
                               

                                <div className='menu-container' ref={menuRef}>
                                    <div className='menu-trigger justify-center flex flex-col items-center' onClick={()=>{setOpen(!open)}}>
                                            
                                            <div className="bg-red px-3.5 p-2 h-10 rounded-sm mx-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="25" fill="currentColor" class="bi bi-list-ul" viewBox="0 0 16 16">
                                                <path fill-rule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm-3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                                            </svg>
                                            
                                            </div>    
                                            
                                             <p className="font-bold">CATEGORY</p>
                                                
                                                
                                    </div>
                                    <div className={`dropdown-menu  ${open? 'active' : 'inactive'} bg-red max-minitab:mt-[10px] max-laptop:mt-[30px]`} >
                                
                                    <ul className="flex flex-wrap w-full capitalize">
                                    {
                                        categories.map((data =>
                                            <div className="" key={data.id}>
                                            <Link to={`category/${data.name}`} key={data.id} className="flex w-[160px] text-sm mb-1 "><DropdownItem text = {data.name}/></Link>
                                            </div>
                                    ))}
                                     </ul>
                                    </div>
                                </div>

                            </div>


                            
                      {/* HIDDEN SEARCH BAR / VISIBLE WHEN CLICK   */}
                            <div className="flex flex-col justify-center items-center ">

                                <div className='menu-container '  ref={menuSearchRef}>
                                    <div className='menu-trigger justify-center flex flex-col items-center' onClick={()=>{setOpenSearch(!openSearch)}}>
                                            
                                            <div className="bg-red px-3.5 p-2 h-10 rounded-sm mx-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                                                </svg>    
                                            </div>    
                                            <p className="font-bold">SEARCH</p>      
                                    </div>

                                    <div className={`dropdown-menu ${openSearch? 'active' : 'inactive'} bg-red max-minitab:mt-[10px] max-laptop:mt-[30px]`} >
                                
                                    <ul className="flex flex-wrap w-full capitalize ">
                                            <li className="flex w-full h-8">
                                                <input type="text" className="w-full rounded-bl-md rounded-tl-md pl-5 text-base text-gray-600" placeholder="Search Products" />
                                                <button className="basis-1/6 flex text-red text-base border-l-3 border-red  bg-white rounded-tr-md rounded-br-md px-5 font-semibold justify-center items-center "> SEARCH </button>
                               
                                            </li>
                                    </ul>
                                    </div>
                                </div>

                              </div>
                           
                            
                         
                      {/* CART BUTTON   */}
                            <div className="flex flex-col justify-center items-center">
                                <Link to='/cart' className="bg-red px-3.5 p-2 h-10 rounded-sm mx-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-cart-fill" viewBox="0 0 16 16">
                                        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                                    </svg>
                                </Link>
                                <p className=" font-bold">CART</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    


        
    {/* MAIN CONTENT CONTAINER */}
    <main className="mt-[260px] min-h-[700px]">

        <Outlet/>
       
    </main>


    {/* FOOTER CONTAINER */}
    <div className='flex justify-center w-full p-100 bg-black mt-20'>
            <div className='flex w-4/6 flex-col mt-4 max-tablet:w-5/6 max-tablet:px-5'>
                <div className='flex flex-row w-full'>
                    <div className='flex flex-row w-1/2 max-tablet:w-[30%]'>
                        <div className='flex flex-col w-12 items-center'>
                            <svg className="h-8 w-8 mb-2 mt-5 text-red"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round">  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
                            <svg className="h-8 w-8 mb-2"  viewBox="0 0 24 24"  fill="#AF1B3F" stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round">  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>  
                            <svg className="h-8 w-8 mb-2"  viewBox="0 0 24 24"  fill="#AF1B3F"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round">  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" /></svg>
                            <svg className="h-8 w-8 mb-2 text-red"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round">  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />  <rect x="2" y="9" width="4" height="12" />  <circle cx="4" cy="4" r="2" /></svg>
                        </div>
                        <div className='flex flex-col'>
                            <NavLink to="https://facebook.com" target="_blank"><p className='text-white mb-3 mt-5 ml-5 font-semibold text-xl max-notebook:text-sm max-notebook:mt-7 max-mobile:hidden'>Facebook</p></NavLink>
                            <NavLink to="https://instagram.com" target="_blank"><p className='text-white mb-3 ml-5 font-semibold text-xl max-notebook:text-sm max-notebook:mt-2 max-mobile:hidden'>Instagram</p></NavLink>
                            <NavLink to="https://youtube.com" target="_blank"><p className='text-white mb-3 ml-5 font-semibold text-xl max-notebook:text-sm max-notebook:mt-2 max-mobile:hidden'>Youtube</p></NavLink>
                            <NavLink to="https://linkedin.com" target="_blank"><p className='text-white mb-3 ml-5 font-semibold text-xl max-notebook:text-sm max-notebook:mt-2 max-mobile:hidden'>LinkedIn</p></NavLink>
                        </div>

                    </div>
                    <div className='flex w-1/2 justify-end mt-4 max-tablet:w-[70%]'>
                        <div className="flex flex-col w-4/6 max-tablet:w-4/6 max-mobile:w-full">
                            <div className="text-white text-xl font-semibold mb-3  max-notebook:text-lg">Contact Info</div>
                            <div className="text-white text-m font-semibold border-b-2 border-b-red pb-2 max-notebook:text-sm">DemoEmail@gmail.com</div>
                            <div className="text-white text-m font-semibold border-b-2 border-b-red pb-2 max-notebook:text-sm">0923-265-xxx</div>
                            <div className="text-white text-m font-semibold border-b-2 border-b-red pb-2 max-notebook:text-sm">National highway Demo Address</div>
                        </div>
                    </div>
                </div>
                <div className='flex justify-center w-full py-5'>
                        <div className='flex justify-center flex-col  w-4/6'>
                            <div className='text-red font-extrabold italic text-5xl text-center max-tablet:text-3xl'>EASYSHOP</div>
                            <p className='text-white text-center italic max-tablet:text-sm'> @EASYSHOP2023</p>
                        </div>
                </div>
            </div>
        </div>



    </>
  )



function DropdownItem(props){
  return(
    <li className = 'dropdownItem'>
      <a> {props.text} </a>
    </li>
  );
}
}