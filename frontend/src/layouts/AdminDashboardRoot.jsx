import { NavLink, Outlet, Link, useNavigate } from "react-router-dom"
import AdminSidebarComponents from "../adminComponents/adminSidebarComponents"
import AdminNavComponents from "../adminComponents/adminNavComponents"
import { useContext, useEffect } from "react"
import { AdminAuthContext } from "../context/AdminAuthContext"
function AdminRootPanel() {
  const {admin} =  useContext(AdminAuthContext)
  const navagate =  useNavigate()
  
  useEffect(()=>{
    if(!admin){
      navagate('/admin')
    }
    console.log(admin)
  })

  return (  
    <div className="w-full flex">
      
      <AdminSidebarComponents />
      <div className="w-full flex flex-col  pl-[80px]">
        <AdminNavComponents />
        <div className="flex justify-center pt-[100px] bg-gray-100">
          
        <Outlet />
        </div>
      </div>


    </div>
  )
}

export default AdminRootPanel