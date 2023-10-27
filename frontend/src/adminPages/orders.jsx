import { useContext, useEffect, useState } from "react"
import { Link, useLoaderData } from "react-router-dom"
import { AdminAuthContext } from "../context/AdminAuthContext"
import axios from "axios"

export default function Orders() {
    
    const orders = useLoaderData()
    console.log(orders)
    return (
        <>
            <div className="w-full flex justify-center">
                <div className="w-[80%] flex flex-col bg-white shadow-md">
                        <div className="flex w-full bg-red text-white font-bold p-2 rounded-t-md">
                            <div className="flex justify-center items-center w-[25%]">Transaction Id</div>
                            <div className="flex justify-center items-center w-[25%]">Date Ordered</div>
                            <div className="flex justify-center items-center w-[25%]">Status</div>
                            <div className="flex justify-center items-center w-[25%]">Action</div>
                </div>


                        <div id="orderContainer" className="w-full overflow-y-scroll h-[600px]">
                            
                            {orders.map((order) =>(
                                

                            <div key={order.id}className="flex w-full py-2 border-b-1 border-gray-300">
                                <div className="flex justify-center items-center w-[25%] px-3"> {order.transaction_id}</div>
                                <div className="flex justify-center items-center w-[25%] px-3 text-sky-500 ">{ new Date(order.createdAt).toLocaleString()}</div>
                                <div className="flex justify-center items-center w-[25%] font-semibold">{order.status}</div>
                                <div className="flex justify-center items-center w-[25%]">
                                
                                        <span className=" inline-block px-3 py-1  text-sm font-semibold bg-green-200 rounded-2xl text-green-900 leading-tight mr-2">
                                            <Link  to={`../order-info/${order.id}` } > View Order Info / Update Status</Link>
                                        </span>
                                    
                                </div>
                            </div>


                            ))}

                        </div>
                        <div className="flex w-full bg-red text-white font-bold p-2 rounded-b-md h-10"></div>

                </div>
            </div>
        
        </>
    )
}
