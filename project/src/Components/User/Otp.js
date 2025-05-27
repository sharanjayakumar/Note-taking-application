import React from 'react'
import { useNavigate } from 'react-router-dom';

function Otp() {
    let navigate = useNavigate();
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
                /><br/>
                <button onClick={e=>{e.preventDefault();navigate('/resetpwd')}}>Confirm OTP</button>
            </form>
        </center>
        
    </div>
  )
}

export default Otp