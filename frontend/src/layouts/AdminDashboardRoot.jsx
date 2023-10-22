import { NavLink, Outlet, Link } from "react-router-dom"
import AdminSidebarComponents from "../adminComponents/adminSidebarComponents"
import AdminNavComponents from "../adminComponents/adminNavComponents"

function AdminRootPanel() {
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