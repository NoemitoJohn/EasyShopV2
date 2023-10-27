import { createContext, useEffect, useReducer, useState } from "react";

export const AdminAuthContext = createContext()


const adminReducer = (admin, action) => {
    switch(action.type){
        case 'LOGIN' : 
        return {admin : action.payload}
        case 'LOGOUT' : 
        return

    }
}


export const AdminAuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(adminReducer, {
        admin : null
    })

    useEffect(()=>{
        const data = JSON.parse(localStorage.getItem('admin'))
        
        if(data){
            console.log('data', data)
            dispatch({type: 'LOGIN', payload : data})
        }
    },[])


    console.log('admin', state.admin)
    return(
        <AdminAuthContext.Provider value={{ admin: state.admin, dispatch}}>
            {children}
        </AdminAuthContext.Provider>
    )
}