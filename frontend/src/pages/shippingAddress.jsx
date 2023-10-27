import { useContext, useEffect, useState } from "react"
import { UserAuthContext } from "../context/UserAuthContext"
import { useNavigate } from "react-router-dom"
import axios from "axios"

export default function shippingAddress() {
    const {user} =  useContext(UserAuthContext)
    const [shippingAddrs, setshippingAddrs] = useState()
    const navigate = useNavigate()
    const [addrs1, setAddrs1] = useState()
    const [addrs2, setAddrs2] = useState()
    const [city, setCity] = useState()
    const [state, setState] = useState()
    const [country, setCountry] = useState()
    const [zipcode, setZipcode] = useState()
    
    useEffect(()=> {
        if(!user){
             navigate('/login')
        }
        const fetch = async () =>{
            try {
                const {data} = await axios.get(`http://127.0.0.1:3000/api/user/address`, {
                    headers : {
                        'Authorization': `Bearer ${user.token}`
                    }
                })
                if(data){
                    setshippingAddrs(data)    
                }
            } catch (error) {
                console.log(error)
            }
            

        }

         fetch()
    },[user])


    async function handleSubmit (e){
        e.preventDefault()
        //TODO: change to production URL
        try
        {
            const req = await axios.post('http://127.0.0.1:3000/api/user/address',
            {add1 : addrs1, add2 : addrs2, city : city, state : state, country : country, zip : zipcode},
            {
                headers : {
                    'Authorization': `Bearer ${user.token}`
                }
            })

            if(req.data) 
                setshippingAddrs(req.data)
        } catch(error){
            console.log(error)
        }

    }

    return (
        <>
            <div className="flex  w-full justify-evenly max-laptop:flex-col max-laptop:justify-center max-laptop:items-center">
                
                <div className="flex flex-col h-[300px] w-[45%] max-w-[700px] min-w-[250px] bg-white p-8 rounded shadow-lg max-laptop:mb-10 max-laptop:w-[80%]">
                    <div className="w-full flex justify-center item-cecnter text-2xl font-bold text-gray-600 max-minitab:text-base text-center">CURRENT SHIPPING ADDRESS</div>
                    {shippingAddrs ? (

                    <div className="w-full flex justify-center items-center italic font-semibold text-center text-gray-600 mt-10 text-2xl max-minitab:text-base">
                      {`${shippingAddrs.address_line_1}, ${shippingAddrs.address_line_2}, ${shippingAddrs.city}, ${shippingAddrs.country} (${shippingAddrs.zipcode})`}</div>

                    ) : (
                        <div className="w-full flex justify-center items-center italic  text-center text-gray-600 mt-10 text-2xl max-minitab:text-base">
                        No shipping address please create one.</div>
                    )}
                    
                </div>


                <form onSubmit={handleSubmit} className="flex flex-col w-[45%] max-w-[700px] min-w-[250px] bg-white p-8 rounded shadow-lg max-laptop:mb-10 max-laptop:w-[80%]">
                    <div className="w-full flex justify-center item-cecnter text-2xl font-bold text-gray-600 text-center max-minitab:text-xl max-minitab:mb-3">ADD SHIPPING ADDRESS</div>

                    <div className="font-semibold text-gray-500 my-2">Home Address 1:</div>
                    <span><input type="text" onChange={(e) => setAddrs1(e.target.value)} placeholder="Address Line 1" className="w-full h-9 pl-3 border-1 border-gray-400 bg-gray-100 rounded"/></span>
                    
                    <div className="font-semibold text-gray-500 my-2">Home Address 2:</div>
                    <span><input type="text" onChange={(e) => setAddrs2(e.target.value)} placeholder="Address Line 2" className="w-full h-9 pl-3 border-1 border-gray-400 bg-gray-100 rounded"/></span>

                    <div className="font-semibold text-gray-500 my-2">City:</div>
                    <span><input type="text" onChange={(e) => {setCity(e.target.value)}} placeholder="Enter City" className="w-full h-9 pl-3 border-1 border-gray-400 bg-gray-100 rounded"/></span>

                    <div className="font-semibold text-gray-500 my-2">Province/State:</div>
                    <span><input type="text" onChange={(e) => {setState(e.target.value)}} placeholder="Enter province" className="w-full h-9 pl-3 border-1 border-gray-400 bg-gray-100 rounded"/></span>

                    <div className="font-semibold text-gray-500 my-2">Country:</div>
                    <span><input type="text" onChange={(e) => {setCountry(e.target.value)}} placeholder="Enter Country" className="w-full h-9 pl-3 border-1 border-gray-400 bg-gray-100 rounded"/></span>

                    <div className="font-semibold text-gray-500 my-2">Zipcode:</div>
                    <span><input type="text" onChange={(e) => {setZipcode(e.target.value)}} placeholder="Zipcode" className="w-full h-9 pl-3 border-1 border-gray-400 bg-gray-100 rounded"/></span>
                    <button className="w-full bg-red text-white font-semibold py-2 rounded mt-5">SET ADDRESS</button>
                </form>
            

            </div>
        </>
    )
}
