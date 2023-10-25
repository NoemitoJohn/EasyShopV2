

export default function cart() {
  return (
    <div className="grid justify-items-stretch">  
        <div className="flex justify-self-center w-4/6 space-x-3 ">
            <div className="w-4/6 space-y-3">
                  <div className="flex w-full bg-white shadow-lg rounded p-3 pl-5 text-gray-700 font-bold font-xl">CART ITEM LIST</div>

                  
                      {carts && carts.map((cart) => (

                        <ProductCartComponet key={cart.cart_id} 
                        _id = {cart.cart_id} 
                        name= {cart.product.name}
                        price={cart.product.price}
                        qty={cart.quantity}
                        thumbnail={cart.product.products_info.thumbnail}
                        />

                      ))}

                  
                    
            </div>
            
                 {/* DISPLAY TOTAL AMOUNT HERE (ORDER SUMMARY)*/}
            <div className="w-2/6 max-h-[21rem] bg-white shadow-lg rounded p-5">
                  <div className="font-semibold pb-3 border-b-2">Order Summary</div>
                  <div className="mt-5 flex">
                      <div className="w-1/2">Total items :</div>
                  
                      <div className="text-right w-1/2">P {new Intl.NumberFormat().format(total)}.00</div>
                      
                      
                    </div>
                  <div className="mt-5 flex">
                       <div className="w-1/2">Subtotal :</div>
                      <div className="w-1/2 text-end">0</div>
                  </div>
                  <div className="mt-5 border-t-2 pt-2">Location :</div>
                  <div className="italic text-gray-500">Sample Address @ street b5 l8, Barangay, City, Province</div>

                  <div className="w-full"><button disabled={isLoading} onClick={checkout} className="w-full bg-red text-white font-semibold py-2 rounded mt-4">PROCEED TO CHECKOUT</button></div>
            </div>

        </div>
    </div>
  )
}
