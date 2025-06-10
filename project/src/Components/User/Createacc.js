import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Nav from './Nav'
import Createnav from './Createnav'
import instance from '../../Utils/axios'
function Createacc() {
  const navigate=useNavigate()
  const [data,userdata]=useState({username:"",email:"",password:"",cpasswd:"",phno:"",image:null})
  const handlechange = (e)=>{
    userdata({ ...data, [e.target.name]: e.target.value })
  }
  const addUser = async()=>{
    try {
    var token = localStorage.getItem("token")
    const formData=new FormData()
    formData.append("username",data.username)
    formData.append("email",data.email)
    formData.append("password",data.password)
    formData.append("phno",data.phno)
    formData.append("profile",data.image)
    await instance.post('/userlogin/register',formData,
      {headers:{"Content-Type":"multipart/form-data"}})
      alert("User added successfully")
      navigate("/login")
    }
    catch{
      alert("Error")
    }
  } 
  const handleFile=(e)=>{
     userdata({ ...data,image:e.target.files[0]})

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
        <form className="mb-3 mx-auto" controlId="formBasicNumber">
        <label className='text-center w-100'>Profile image</label> 
        <center><input  onChange ={handleFile} name='image' style={{width:'300px'}} className='mx-auto' type="file" /></center><br/>
        </form>
        <div className="button-group"> 
      <button className='w-25 butn' style={{backgroundColor:'blue',color:'white',marginLeft:"160px"}} variant="primary" type="submit">
        <Link to='/login'></Link>
        Create account
      </button>
        <Link to='/login'><button className='w-50  butn' style={{backgroundColor:'blue',color:'white',marginLeft:"100px"}} variant="primary" type="submit"> Back </button></Link> 
     </div><br></br>
    </form>
    </div>
  )
}

export default Createacc