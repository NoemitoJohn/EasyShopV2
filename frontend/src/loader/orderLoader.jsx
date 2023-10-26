import axios from "axios"

export const orderLoader = async () =>{
    //TODO: change link to production
    
        const {data} = await axios.get('http://127.0.0.1:3000/api/admin/orders')
        
        return data
    
}