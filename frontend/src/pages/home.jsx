import { Link } from "react-router-dom"


function Home() {
console.log(process.env.BACK_END_API) 
  return (
    <>
        <div className="w-full flex flex-col justify-center items-center">
            <div className="w-4/6 flex flex-col">
                <div className="w-full h-[400px] bg-white shadow-lg border-gray-600 p-2 rounded">
                    <div className="w-full h-full bg-gray-300 rounded justify-center items-center flex text-gray-500 font-bold font-xl">CAROUSEL SLIDER</div>
                </div>


                <div className="w-full mt-5">
                    <h2 className="mt-5 pl-6 mb-2">SMARTPHONE</h2>
                    <div className="flex flex-wrap w-full justify-center ">
                          <div className="w-[19%] h-[300px] border-2 bg-white mb-2 mr-0.5 shadow-md">asd</div>
                          <div className="w-[19%] h-[300px] border-2 bg-white mb-2 mr-0.5 shadow-md">asd</div>
                          <div className="w-[19%] h-[300px] border-2 bg-white mb-2 mr-0.5 shadow-md">asd</div>
                          <div className="w-[19%] h-[300px] border-2 bg-white mb-2 mr-0.5 shadow-md">asd</div>
                          <div className="w-[19%] h-[300px] border-2 bg-white mb-2 mr-0.5 shadow-md">asd</div>
                    </div>     
                    <h2 className="mt-5 pl-6 mb-2">SMARTPHONE</h2>
                    <div className="flex flex-wrap w-full justify-center ">
                          <div className="w-[19%] h-[300px] border-2 bg-white mb-2 mr-0.5">asd</div>
                          <div className="w-[19%] h-[300px] border-2 bg-white mb-2 mr-0.5">asd</div>
                          <div className="w-[19%] h-[300px] border-2 bg-white mb-2 mr-0.5">asd</div>
                          <div className="w-[19%] h-[300px] border-2 bg-white mb-2 mr-0.5">asd</div>
                          <div className="w-[19%] h-[300px] border-2 bg-white mb-2 mr-0.5">asd</div>
                    </div>  
                    <h2 className="mt-5 pl-6 mb-2">SMARTPHONE</h2>
                    <div className="flex flex-wrap w-full justify-center ">
                          <div className="w-[19%] h-[300px] border-2 bg-white mb-2 mr-0.5">asd</div>
                          <div className="w-[19%] h-[300px] border-2 bg-white mb-2 mr-0.5">asd</div>
                          <div className="w-[19%] h-[300px] border-2 bg-white mb-2 mr-0.5">asd</div>
                          <div className="w-[19%] h-[300px] border-2 bg-white mb-2 mr-0.5">asd</div>
                          <div className="w-[19%] h-[300px] border-2 bg-white mb-2 mr-0.5">asd</div>
                    </div>   
                                
                </div>
                <div className="">asd</div>
                <div className="">asd</div>
            </div>
        </div>
    </>
  )
}

export default Home