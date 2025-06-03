import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Nav from './Nav'
import Createnav from './Createnav'
function Createacc() {
  const [data,userdata]=useState({username:"",email:"",password:"",cpasswd:"",phno:""})
  const handlechange = (e)=>{
    userdata({ ...data, [e.target.name]: e.target.value })
  }
  const addUser = async()=>{
    try {
    var token = localStorage.getItem("token")
    await axios.post('http://localhost:3000/userlogin/register',{
      username:data.username,
      email:data.email,
      password:data.password,
      phno:data.phno
      },{headers:{Authorization:`Bearer ${token}`}})
      alert("User added successfully")
    }
    catch{
      alert("Error")
    }
  }
    const handleSubmit=(e)=>{
      
      e.preventDefault()
      if(validate())
        {addUser()}
    }
    const validate=()=>{
      let flag = true;
      if (data.username.length<4)
      {
        flag = false;
        alert("Enter your full name");
      }
      if (data.password<8)
      {
        flag = false;
        alert("Enter a strong password");
      }
      if (data.phno.length<10)
      {
        flag = false;
        alert("Enter a valid phone number");
      }
      if(data.cpasswd != data.password)
      {
        flag = false;
        alert("Password and confirm password are diffrent");
      }
      return flag;
    }
    
  return (
    <div>
      <form onSubmit={handleSubmit} className='my-3 mx-auto d-flex flex-column' style={{border:'solid',width:'700px'}}>
    
      <form className="mb-3 mx-auto" controlId="formBasicEmail">
      <label className='text-center w-100'>ID/NAME</label><br/>
      
      <center><input onChange={handlechange} style={{width:'300px'}} name='username' type="text" placeholder="Enter name or id" /></center><br/>
      
      
        <label className='text-center w-100'>Email address</label><br/>
        <center><input onChange={handlechange} name='email' style={{width:'300px'}} className='mx-auto' type="email" placeholder="Enter email" /></center><br/>
        <label className="text-muted">
          We'll never share your email with anyone else.
        </label>
      </form>

      <form className="mb-3 mx-auto" controlId="formBasicPassword">
        <label className='text-center w-100'>Password</label>
        <center><input onChange={handlechange} name='password' style={{width:'300px'}} className='mx-auto' type="password" placeholder="Password" /> </center>
      </form>
      <form className="mb-3 mx-auto" controlId="formBasicPassword">
        <label className='text-center w-100'>Confirm Password</label>
        <center><input onChange={handlechange} name='cpasswd' style={{width:'300px'}} className='mx-auto' type="password" placeholder="Password once more" /></center>
      </form>
      <form className="mb-3 mx-auto" controlId="formBasicNumber">
        <label className='text-center w-100'>Phone Number</label> 
        <center><input onChange={handlechange} name='phno' style={{width:'300px'}} className='mx-auto' type="number" placeholder="Your 10 digit number" /></center><br/>
        </form>
        <div className="button-group"> 
      <button className='w-25 butn' style={{backgroundColor:'blue',color:'white',marginLeft:"160px"}} variant="primary" type="submit">
        <Link to='/login'></Link>
        Create account
      </button>
        <Link to='/login'><button className='w-50 butn' style={{backgroundColor:'blue',color:'white',marginLeft:"100px"}} variant="primary" type="submit"> Back </button></Link> 
     </div><br></br>
    </form>
    </div>
  )
}

export default Createacc