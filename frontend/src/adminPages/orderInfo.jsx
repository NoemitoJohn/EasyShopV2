import axios from "axios";
import { useState } from "react";
import { useLoaderData } from "react-router-dom"

export default function OrderInfo() {
    const order = useLoaderData();
    const [status, setStatus] = useState(order.status)
    const [statusCurrent, setStatusCurrent] = useState(order.status)
    const [orderId, setOrderId] = useState(order.id)

    async function handleSubmit(e){
        e.preventDefault();
        //TODO: change url to production and header 
        try {
            const {data} = await axios.patch(`${import.meta.env.VITE_BACK_END_API}/api/admin/order`,
            {id : orderId, status : status})
    
            setStatusCurrent(data)
            
        } catch (error) {
            console.log(error)
        }

    }
    console.log('order', order)

    return (
        <>
            <div className="w-full flex">
                <div className="flex flex-col w-[55%] ml-5 p-5">
                <div className="flex w-full bg-red text-white font-bold p-2 rounded-t-md">
                            <div className="flex justify-center items-center w-[45%]">Product Name</div>
                            <div className="flex justify-center items-center w-[15%]">Product Price</div>
                            <div className="flex justify-center items-center w-[15%]">Quantity</div>
                            <div className="flex justify-center items-center w-[25%]">Action</div>
                        </div>


                        <div className="w-full overflow-y-scroll h-[600px] bg-white">

                            {order.product_item.map((item) => (
                                <div key={item.id} className="flex w-full py-2 border-b-1 border-gray-300">
                                <div className="flex justify-center items-center w-[45%] px-3">{item.product.name}</div>
                                <div className="flex justify-center items-center w-[15%] px-3">{new Intl.NumberFormat().format(item.product.price) }</div>
                                <div className="flex justify-center items-center w-[15%] px-3">{item.product.quantity}</div>
                                <div className="flex justify-center items-center w-[25%]">
                                
                                        <span className=" inline-block px-3 py-1  text-sm font-semibold bg-green-200 rounded-2xl text-green-900 leading-tight mr-2">
                                            Product Details
                                        </span>
                                    
                                </div>
                            </div>
                            ))}
                            


                        </div>
                        <div className="flex w-full bg-red text-white font-bold p-2 rounded-b-md h-10"></div>

                </div>


                <div className="flex flex-col w-[40%] p-5">
                    <div className="flex flex-col w-full shadow-md mb-5">
                        <div className="flex justify-center w-full bg-red text-white font-bold py-2 rounded-t-md">ORDER INFO</div>
                        <div className="w-full bg-white rounded-b-md p-5">
                            <div className="w-full  ml-5">Account Name : <span className="font-semibold italic ml-2">{`${order.user.first_name} ${order.user.last_name}`}</span></div>
                            <div className="w-full  ml-5">Payment Status : <span className="font-semibold italic ml-2">Paid via Card / Cash on Delivery</span></div>
                            <div className="w-full  ml-5">Total Items : <span className="font-semibold italic ml-2">{order.product_item.length}</span></div>
                            <div className="w-full  ml-5">Total Price : <span className="font-semibold italic ml-2 text-red">&#8369; { new Intl.NumberFormat().format(order.total / 100)}.00</span></div>
                            <div className="w-full  ml-5">Order Date : <span className="font-semibold italic ml-2 text-green-500">{new Date(order.createdAt).toLocaleString()}</span></div>
                            <div className="w-full  ml-5">Transaction Id : <span className="font-semibold italic ml-2">{order.transaction_id}</span></div>
                        </div>
                    </div>
                    <div className="flex flex-col w-full shadow-md mb-5">
                        <div className="flex justify-center w-full bg-red text-white font-bold py-2 rounded-t-md">SHIPPING INFORMATION</div>
                        <div className="flex flex-col w-full bg-white rounded-b-md p-5">
                            <span className="w-full">Shipping Address :</span>
                            <span className="w-full pl-5 font-bold italic text-gray-600">{`${order.user.users_address.address_line_1}, ${order.user.users_address.address_line_2}, ${order.user.users_address.city}, ${order.user.users_address.country}, (${order.user.users_address.zipcode}) `}</span>
                        </div>
                    </div>
                    <div className="flex flex-col w-full shadow-md mb-5">
                        <div className="flex justify-center w-full bg-red text-white font-bold py-2 rounded-t-md">UPDATE STATUS</div>
                        <div className="w-full bg-white rounded-b-md p-3 pb-5">
                            <div className="ml-3 my-5">Current Status : <span className="font-semibold italic pl-4">{String(statusCurrent).toUpperCase()}</span></div>
                            
                            <div className="w-[95%] border-t-1  border-gray-700 ml-3 pt-3">Select Status :</div>
                            <form onSubmit={handleSubmit} class="w-[80%] ml-[10%] mt-3">
                                <fieldset>
                                        <div class="relative border border-gray-300 text-gray-800 bg-white shadow-lg">
                                            <label htmlFor="frm-whatever" class="sr-only">My field</label>
                                            <select onChange={(e) => setStatus(e.target.value)} class="appearance-none w-full py-1 px-2 bg-white" name="whatever" id="frm-whatever">
                                                <option value="">Please choose&hellip;</option>
                                                <option value="1">To Pack</option>
                                                <option value="2">Packed</option>
                                                <option value="shipping">Out for Delivery</option>
                                                <option value="receive">Delivered</option>
                                                <option value="3">Cancel</option>
                                                <option value="3">Returned</option>
                                            </select>
                                            <div class="pointer-events-none absolute right-0 top-0 bottom-0 flex items-center px-2 text-gray-700 border-l">
                                                <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                                </svg>
                                            </div>
                                        </div>
                                </fieldset>
                                <button className="w-[80%] ml-[10%] mt-4 bg-gray-400 rounded-md text-white py-2 font-semibold ">UPDATE</button>
                            </form>
                        </div>
                    </div>
                </div>

                

            </div>
        
        </>
    )
}
