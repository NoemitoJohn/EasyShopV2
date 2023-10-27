import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLoaderData, useNavigate, useParams } from 'react-router-dom';

function signupVerify() {
    
    const {token} = useParams()
    
    
    const navigate = useNavigate()

    const [message, setMessage] = useState('');

    useEffect(()=>{
        async function fetchData(){
            const {data} = await axios.post(`${import.meta.env.VITE_BACK_END_API}/api/user/verify/${token}`);
            
            if(data.status == 200) { 
                setMessage('Email Verified Redirecting...')
                setTimeout(() => { navigate('/') }, 1500 )
                }
            if(data.status == 400) {setMessage(data.message)}
        }
        fetchData()
    },[])


    return (
        <div>
             {/* {check(verify)} */}
            <p className='text-center'> {message} </p>  
        </div>
    );
}

export default signupVerify;
