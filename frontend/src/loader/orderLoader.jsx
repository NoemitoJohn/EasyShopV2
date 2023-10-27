import axios from "axios"

export const ordersLoader = async () =>{
    //TODO: change link to production
    try{
        const {data} = await axios.get(`${import.meta.env.VITE_BACK_END_API}/api/admin/orders`)
        
        return data

    }catch(error){
        console.log(error)
    }
    
}

export const orderLoader = async ({params}) => {
    const {id} = params
    try {
        const {data} = await axios.get(`${import.meta.env.VITE_BACK_END_API}/api/admin/order/${id}`)
    
        return data
        
    } catch (error) {
        console.log(error)
    }
}