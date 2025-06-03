import React, { useState } from 'react'
import woman_thinking from '../../Assets/woman_thinking_forgotpass.jpg';
import man_thinking from '../../Assets/man_thinking_forgotpass.JPG';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
function Forgotpass() {
  let navigate = useNavigate()
  const [input,setInput]=useState("")
  const validate=(e)=>{
    e.preventDefault();
    if(input=="")
    {
      alert("Enter email");
    }
    else{
      const userlogin = async()=>{
        axios.post("http://localhost:3000/verify-email",{
          email:input
        }).then((res)=>{
          if(res.data)
          {
            navigate("/otp")
            localStorage.setItem("token",res.data.token)
             localStorage.setItem("email",input)
          }
         
        })
        .catch((err)=>{
          if(err.status == 400)
          {
            alert("Invalid credentials")
          }
          console.log(err)
        });
      }
       userlogin()
    }
    
  }
  return (
    <div className='d-flex'>
      <img src={woman_thinking} className='w-25 h-25'/>
      <form onSubmit={validate} className='form-control my-5 border-0 d-flex flex-column justify-content-center mx-auto w-auto'>
        <label className='mx-auto'>Enter your mail id or phone number to reset your password </label><br/>
        <input className='w-75 mx-auto' placeholder='You will recieve a message shortly' onChange={(e) =>
                  setInput(e.target.value)}/><br/>
        <button className='mx-auto' style={{backgroundColor:'blue',color:'white', width:'200px',height:'35px'}} variant="primary" type="submit">Send reset password link 
        </button>
      </form>
      <img src={man_thinking} className='w-25 h-25'/>
    </div>
  )
}

export default Forgotpass