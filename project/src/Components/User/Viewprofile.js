import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Createnav from './Createnav';
function Viewprofile() {
    const [profile, setProfile] = useState({});
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
  return (
    <div>
        <Createnav></Createnav>
        <br/>
        <h1 className='w-100 text-center'>VIEW PROFILE</h1>
        <form className='form-control mx-auto w-50'>
            <label>USER ID: {profile.username}</label><br/>
            <label>EMAIL: {profile.email}</label><br/>
            <label>PHONE NUMBER: {profile.phno}</label><br/><br/>
            <Link to='/dashboard' className='btn btn-primary mx-5'>Back</Link>
            <Link to='/editprofile' className='btn btn-primary mx-5'>Edit</Link>
        </form>
        
        
    </div>
  )
}

export default Viewprofile