import { NavLink } from "react-router-dom"

export default function adminNavComponents() {
  return (
    <>
         <div className="w-full h-12 py-2 flex justify-start items-center bg-red text-white mb-10 fixed">
              <div className="flex justify-center h-6 px-5 items-center font-medium">
                  <NavLink to="product-list">Product List</NavLink>
              </div>
              <div className="flex justify-center h-6 px-5 items-center font-medium">
                  <NavLink to="add-products">Add Products</NavLink>
              </div>
              <div className="flex justify-center h-6 px-5 items-center font-medium">
                  <NavLink to="add-stocks">Add Stocks</NavLink>
              </div>
              <div className="flex justify-center h-6 px-5 items-center font-medium">
                  <NavLink to="category">Category</NavLink>
              </div>
          </div>

    </>
  )
}
