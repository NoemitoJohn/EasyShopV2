import { useState } from "react";
import { useUserAuthContext } from "./useUserAuthContext"
import axios from "axios";

export const useLogin = ()=>{
    
    const [error, setError] = useState(null)
    const [isLoading, setLoading] = useState(null)
    const {dispatch} = useUserAuthContext()

    const login = async(email, password) => {
        
        setLoading(true)
        
        setError(null)
        
        const {data} = await axios.post(`${import.meta.env.VITE_BACK_END_API}/api/user/login`, {email, password})

        if(data.status == 400){
            setLoading(false)
            setError(data.message)
        }
        if(data.status == 200){

            const user = { email : data.user.email, token : data.token}
            localStorage.setItem('user', JSON.stringify(user))

            dispatch({type : 'LOGIN', payload : user})

            setLoading(false)
        }
    }
    return { login, isLoading, error}
}