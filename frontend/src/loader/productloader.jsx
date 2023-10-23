


export const productLoader = async ()=>{
    //dont change the api link even if the domain is replace
    const res = await fetch(`${process.env.BACK_END_API}/api/products/`)
    // const res = await fetch('https://demolive-api.vercel.app/api/products') 
      return res.json()
  }


export const productInfoLoader = async ({params}) =>{
    const { id } = params
    
    const res = await fetch(`${process.env.BACK_END_API}/api/products/${id}` )  
    // const res = await fetch(`https://demolive-api.vercel.app/products/` + id  )

    return res.json()
}


export const productPerCategoryLoader = async ()=>{
    const { name } = params
    //dont change the api link even if the domain is replace
    const res = await fetch(`${process.env.BACK_END_API}/api/products/categories/${name}`)
    // const res = await fetch('https://demolive-api.vercel.app/categories') 
      return res.json()
  }

export const categoriesLoader = async ()=>{
    //dont change the api link even if the domain is replace
    const res = await fetch(`${process.env.BACK_END_API}/api/products/categories`)
    // const res = await fetch('https://demolive-api.vercel.app/categories') 
      return res.json()
  }



