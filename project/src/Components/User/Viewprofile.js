import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Createnav from './Createnav';
import instance from '../../Utils/axios';
import image from '../../Assets/default.jpg'
function Viewprofile() {
    const [profile, setProfile] = useState({});
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
    return (
        <div>
            <Createnav></Createnav>
            <br />
            <h1 className='w-100 text-center'>VIEW PROFILE</h1>
            <form className='form-control mx-auto w-50'>
                <center><img src={profile.image ? URL.createObjectURL(profile.image) : (profile.profile ? "http://localhost:3000/uploads/" + profile.profile : image)} alt="" className='mx-auto' width="100px" name="image"></img></center><br></br>
                <div className='d-flex flex-column align-items-center'>
                    <div style={{ textAlign: 'left', width: '60%'}}>
                        <div className='mb-3'><strong>USER ID:</strong> {profile.username}</div>
                        <div className='mb-3'><strong>EMAIL:</strong> {profile.email}</div>
                        <div className='mb-3'><strong>PHONE NUMBER:</strong> {profile.phno}</div>
                    </div>
                </div><br />
                <center><Link to='/dashboard' className='btn btn-primary mx-5'>Back</Link>
                    <Link to='/editprofile' className='btn btn-primary mx-5'>Edit</Link></center>

            </form>


        </div>
    )
}

export default Viewprofile