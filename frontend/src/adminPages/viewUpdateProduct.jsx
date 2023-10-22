import { useLoaderData, useParams } from "react-router-dom"


export default function productInfo() {
    const { id } = useParams()
    const adminProductInfo = useLoaderData()

  return (
    <>
        
        
        <div>viewUpdateProduct {adminProductInfo.name} {console.log(adminProductInfo.name)}</div>
        
    </>
  )
}
