import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLoaderData, useNavigate, useParams } from 'react-router-dom';

function signupVerify() {
    
    const {token} = useParams()
    
    
    const navigate = useNavigate()

    const [message, setMessage] = useState('');

    useEffect(()=>{
        async function fetchData(){
            const {data} = await axios.post(`http://127.0.0.1:3000/api/user/verify/${token}`);
            
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
            <p className='text-center'> {message} </p>  
        </div>
    );
}

export default signupVerify;
