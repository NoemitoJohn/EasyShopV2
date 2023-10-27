


export const productLoader = async ()=>{
  //dont change the api link even if the domain is replace
  const res = await fetch('http://localhost:3000/api/products/all')
  // const res = await fetch('https://demolive-api.vercel.app/api/products/all') 
    return res.json()
}


export const productLimitLoader = async ()=>{
  //dont change the api link even if the domain is replace
  const res = await fetch('http://localhost:3000/api/products')
  // const res = await fetch('https://demolive-api.vercel.app/api/products') 
    return res.json()
}



export const productInfoLoader = async ({params}) =>{
  const { id } = params
  
  // const res = await fetch(`${import.meta.env.VITE_BACK_END_API}/api/products/${id}` )  
  const res = await fetch(`http://localhost:3000/api/products/` + id  )

  return res.json()
}


export const productPerCategoryLoader= async ({params})=>{
  const { name } = params
    //dont change the api link even if the domain is replace
      
      const res = await fetch('http://localhost:3000/api/products/category/' + name)
    // const res = await fetch('https://demolive-api.vercel.app/categories/' + name) 
      return res.json()
}



export const categoriesLoader = async ()=>{
  //dont change the api link even if the domain is replace
    
    const res = await fetch('http://localhost:3000/api/products/categories')
  // const res = await fetch('https://demolive-api.vercel.app/categories') 
    return res.json()
}


export const categoriesAndProductsLoader = async ()=>{
     const res =  Promise.all([
        await fetch('http://localhost:3000/api/products/categories'),
        await fetch('http://localhost:3000/api/products/all')])
      return res.json()
}
