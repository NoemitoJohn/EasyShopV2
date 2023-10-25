import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLoaderData, useNavigate, useParams } from 'react-router-dom';

function signupVerify() {
    
    const {token} = useParams()
    
    
    const navigate = useNavigate()

    const [message, setMessage] = useState('');

    useEffect(()=>{
        async function fetchData(){
<<<<<<< HEAD
            // const {data} = await axios.post(`${import.meta.env.VITE_BACK_END_API}/api/user/verify/${token}`);
            const {data} = await axios.post(`http://localhost:3000/api/user/verify/${token}`);
            
=======
            const {data} = await axios.post(`http://127.0.0.1:3000/api/user/verify/${token}`);
>>>>>>> 152094a6925bfefeee58fd0d23445f62b060af6e
            
            if(data.status == 200) { 
                setMessage('Email Verified Redirecting...')
                setTimeout(() => { navigate('/') }, 3000 )
                }
            if(data.status == 400) {setMessage(data.message)}
        }
        fetchData()
    },[])


    return (
        <div>
             {/* {check(verify)} */}
<<<<<<< HEAD
            <p className='text-center'> {message} </p>  
=======
            <p> {message} </p>  
>>>>>>> 152094a6925bfefeee58fd0d23445f62b060af6e
        </div>
    );
}

export default signupVerify;
