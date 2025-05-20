import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Createnav from './Createnav';
function Editprofile() {
  const [profile, setProfile] = useState({username:"",email:"",phno:""});
  const handleChange =(e)=>{
    setProfile({...profile,[e.target.name]:e.target.value})
  }
  useEffect(() => {
        const token = localStorage.getItem("token");
        axios.get(`http://localhost:3000/viewprofile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
                setProfile(res.data);
                console.log("Profile details gathered:", res.data);
            })
            .catch((err) => {
                console.log("Error fetching profile data:", err);
            });
    }, []);
  const editprofile = async(req,res)=>{
    
        const token = localStorage.getItem("token");
        axios.put(`http://localhost:3000/editprofile`,profile
          
        , {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
                setProfile(res.data);
                console.log("Profile details gathered:", res.data);
            })
            .catch((err) => {
                console.log("Error fetching profile data:", err);
            });
  }
  return (
    <div>
      <Createnav/>
      <br/>
      <h1 className='w-100 text-center'>EDIT PROFILE</h1>
      <form className='form-control w-50 mx-auto'>
        <label>USER ID: </label><input name='username' onChange={handleChange} className='w-75 mx-3' value={profile.username}/><br/>
        <label>EMAIL: </label><input name='email' onChange={handleChange} className='w-75 mx-4' value={profile.email}/><br/>
        <label>PHONE NUMBER: </label><input name='phno' onChange={handleChange} className='w-75 mx-3' value={profile.phno}/><br/><br/>
        <center>
          <Link to='/viewprofile' onClick={editprofile} className='btn btn-primary'>Confirm</Link>
        </center>
      </form>
    </div>
  )
}

export default Editprofile