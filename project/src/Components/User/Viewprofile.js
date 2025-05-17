import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
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
        <br/>
        <h1 className='w-100 text-center'>VIEW PROFILE</h1>
        <form className='form-control mx-auto w-50'>
            <label>USER ID: {profile.username}</label><br/>
            <label>EMAIL: {profile.email}</label><br/>
            <label>PHONE NUMBER: {profile.phno}</label>
        </form><br/>
        <Link to='/dashboard' className='btn btn-primary'>Back</Link>
        
    </div>
  )
}

export default Viewprofile