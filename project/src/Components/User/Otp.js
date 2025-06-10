import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import instance from '../../Utils/axios';
function Otp() {
    let navigate = useNavigate();
    const [enteredOtp, setEnteredOtp] = useState("");
    const handleSubmit=(e)=>{
        e.preventDefault();
       const email = localStorage.getItem("email");
    instance.post("/verify-otp", {
        email,
        enteredOtp
    })
    .then(res => {
        alert("OTP verified!");
        navigate("/resetpwd");
    })
    .catch(err => {
        alert("Invalid OTP");
    });
    }
  return (
    <div>
        <center>
            <form className='my-5' onSubmit={handleSubmit}>
                <h4>You would have recieved an OTP to your registered email or phone number</h4><br/>
                <input
                    type="text"
                    id="user"
                    className="form-control w-50"
                    placeholder="Enter the six digit otp"
                    value={enteredOtp}
                    onChange={(e)=>setEnteredOtp(e.target.value)}
                /><br/>
                <button type="submit">Confirm OTP</button>
            </form>
        </center>
    </div>
  )
}

export default Otp