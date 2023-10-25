import { createContext, useEffect, useReducer, useState } from "react";

export const UserCartContext = createContext()

function productReducer(state, action){
    switch(action.type){
        case 'SET':
            return action.payload
        case 'DELETE':
            return state.filter((p) => p.cart_id !== action.payload)
        case 'UPDATE':
            return state.map((item)=> {
                
                if(item.cart_id == action.payload.cart_id){
                    item.quantity = action.payload.quantity
                }
                return item
            })
        default: 
            return state
    }
  }
  
  
export const UserCartContextProvider = ({ children }) => {
    
    const [carts, dispatch] = useReducer(productReducer,[])
    const [total, setTotal] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    
    useEffect(()=>{
        let tempTotal = 0
        for (const item of carts) {
              tempTotal += (item.product.price * item.quantity)
              console.log('for loop')
        }
        setTotal(tempTotal)
        console.log('render context', carts)
        console.log('render context total', total)
    })


    return(
        <UserCartContext.Provider value={{carts, dispatch, total, isLoading, setIsLoading}}>
            { children }
        </UserCartContext.Provider>
    )

}