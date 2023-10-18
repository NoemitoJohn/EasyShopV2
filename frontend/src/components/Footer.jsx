
import { NavLink } from 'react-router-dom'

function Footer() {
  return (
    <>
        <div className='flex justify-center w-full p-100 bg-black mt-20'>
            <div className='flex w-4/6 flex-col mt-4'>
                <div className='flex flex-row w-full'>
                    <div className='flex flex-row w-1/2'>
                        <div className='flex flex-col w-12 items-center'>
                            <svg className="h-8 w-8 mb-2 mt-5 text-red"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
                            <svg className="h-8 w-8 mb-2"  viewBox="0 0 24 24"  fill="#AF1B3F" stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>  
                            <svg className="h-8 w-8 mb-2"  viewBox="0 0 24 24"  fill="#AF1B3F"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" /></svg>
                            <svg className="h-8 w-8 mb-2 text-red"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />  <rect x="2" y="9" width="4" height="12" />  <circle cx="4" cy="4" r="2" /></svg>
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

export default Footer