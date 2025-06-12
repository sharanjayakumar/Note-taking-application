import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Createnav from './Createnav';
import instance from '../../Utils/axios';
import image from '../../Assets/default.jpg'
function Editprofile() {
  const navigate=useNavigate()
  const [profile, setProfile] = useState({username:"",email:"",phno:"",image:null});
  const handleChange =(e)=>{
    setProfile({...profile,[e.target.name]:e.target.value})
  }
  useEffect(() => {
        const token = localStorage.getItem("token");
        instance.get(`/viewprofile`)
            .then((res) => {
                setProfile(res.data);
                console.log("Profile details gathered:", res.data);
            })
            .catch((err) => {
                console.log("Error fetching profile data:", err);
            });
    }, []);
  const editprofile = async(e)=>{
    e.preventDefault();
         const formData=new FormData()
    formData.append("username",profile.username)
    formData.append("email",profile.email)
    formData.append("phno",profile.phno)
    formData.append("profile",profile.image)
    
        const token = localStorage.getItem("token");
        instance.put(`/editprofile`,formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
            .then((res) => {
                setProfile(res.data);
                alert("Profile updated successfully")
                console.log("Profile details gathered:", res.data);
                navigate("/viewprofile")
                
            })
            .catch((err) => {
                console.log("Error fetching profile data:", err);
            });
  }
  const handleFile=(e)=>{
     setProfile({ ...profile,image:e.target.files[0]})

  }
  return (
    <div>
      <Createnav/>
      <br/>
      <h1 className='w-100 text-center'>EDIT PROFILE</h1>
      <form className='form-control w-50 mx-auto' onSubmit={editprofile} >
        <center><img src={profile.image ? URL.createObjectURL(profile.image):(profile.profile?"http://localhost:3000/uploads/"+profile.profile:image)} alt="" className='mx-auto' width="100px" name="image"></img></center><br></br>
        <center><input type="file" onChange={handleFile} className='form-control w-50' style={{display:"none"}} id='input' /> </center>
        <center><label className='mx-auto' htmlFor='input'>Change image</label></center><br></br>
        <div className='row'>
          <div className='col-2'>
          <label>USER ID: </label>
          </div>
           <div className='col'>
             <input name='username' onChange={handleChange} className='w-75 mx-3' value={profile.username}/><br/>
          </div>
        </div><br></br>
        <div className='row'>
          <div className='col-2'>
          <label>EMAIL:</label>
          </div>
           <div className='col'>
             <input name='email' onChange={handleChange} className='w-75 mx-3' value={profile.email}/><br/>
          </div>
        </div><br></br>
         <div className='row'>
          <div className='col-2'>
          <label>PHONE NUMBER:</label>
          </div>
           <div className='col'>
              <input name='phno' onChange={handleChange} className='w-75 mx-3' value={profile.phno}/><br/><br/>
          </div>
        </div>
        <center>
          <button className='btn btn-primary' type='submit'>Confirm</button>
        </center>
      </form>
    </div>
  )
}

export default Editprofile