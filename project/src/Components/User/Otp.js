import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
function Otp() {
    let navigate = useNavigate();
    const [otp,setOtp]=useState('');
    const [enteredotp,setEnteredotp]=useState('');
    useEffect(()=>{
        const token = localStorage.getItem("token")
        axios.get("http://localhost:3000/verify-email",{headers:{Authorization:`Bearer ${token}`}})
        .then((res)=>{
            setOtp(res.data.otp)
        })
        .catch((err)=>{
            console.log("Failed to fetch otp")
        })
    },[])
    const handleSubmit=(e)=>{
        e.preventDefault();
        if(otp==enteredotp)
        {
            navigate('/resetpwd')
        }
        else{
            alert("Incorrect otp.Please try again")
        }
    }
  return (
    <div>
        <center>
            <form className='my-5' onClick={handleSubmit}>
                <h4>You would have recieved an OTP to your registered email or phone number</h4><br/>
                <input
                    type="text"
                    id="user"
                    className="form-control w-50"
                    placeholder="Enter the six digit otp"
                    value={enteredotp}
                    onChange={(e)=>setEnteredotp(e.target.value)}
                /><br/>
                <button type="submit">Confirm OTP</button>
            </form>
        </center>
        
    </div>
  )
}

export default Otp