import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
function Otp() {
    let navigate = useNavigate();
    const [otp,setOtp]=useState('');
    useEffect(()=>{
        const token = localStorage.getItem("token")
        axios.get("http://localhost:3000/generateotp",{headers:{Authorization:`Bearer ${token}`}})
        .then((res)=>{
            setOtp(res.data.otp)
        })
        .catch((err)=>{
            console.log("Failed to fetch otp")
        })
    },[])
  return (
    <div>
        <center>
            <form className='my-5'>
                <h4>You would have recieved an OTP to your registered email or phone number</h4><br/>
                <input
                    type="text"
                    id="user"
                    className="form-control w-50"
                    placeholder="Enter the six digit otp"
                    value={otp}
                    onChange={(e)=>setOtp(e.target.value)}
                /><br/>
                <button onClick={e=>{e.preventDefault();navigate('/resetpwd')}}>Confirm OTP</button>
            </form>
        </center>
        
    </div>
  )
}

export default Otp