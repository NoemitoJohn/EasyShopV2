import axios from "axios"

export const ordersLoader = async () =>{
    //TODO: change link to production
    
        const {data} = await axios.get('http://127.0.0.1:3000/api/admin/orders')
        
        return data
    
}

export const orderLoader = async ({params}) => {
    const {id} = params
    try {
        const {data} = await axios.get(`http://127.0.0.1:3000/api/admin/order/${id}`)
    
        return data
        
    } catch (error) {
        
    }
}