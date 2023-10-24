import { createContext, useReducer, useEffect } from "react";

export const UserAuthContext = createContext()

export const authUserReducer = (state, action) => {
    
    switch(action.type) {
        case 'LOGIN' : 
            return {user : action.payload}
        case 'LOGOUT' :
            return {user : null}
        default : 
            return state
    }
}

export const UserAuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authUserReducer, {
        user : null
})
    
    console.log('AuthContext State:', state)
    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem('user'))
        if(user){
            dispatch({type : 'LOGIN', payload : user})
        }
       
    }, [])


    return (
        <UserAuthContext.Provider value={{...state, dispatch}}>
            { children }
        </UserAuthContext.Provider>
    )
}