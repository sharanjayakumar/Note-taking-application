import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import Navbar from './Navbar';
import instance from '../../Utils/axios';
import noteimage from '../../Assets/defaultcopy.jpg'

function ViewDetailednotes() {
    const { id } = useParams();
    const [data,setData]=useState([])
    useEffect(()=>{
        const token=localStorage.getItem("token")
       instance.get(`/viewnote/${id}`)
        .then((res)=>{
            setData(res.data)
        })
        .catch((err)=>{
             console.log(err)
        }) 
    })
     const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this note?");
    if (!confirmDelete) return;

    try {
        const token = localStorage.getItem("token");
        await instance.delete(`/deletenote/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        alert("Note deleted successfully");
    } catch (err) {
        console.error("Delete failed:", err);
        alert("Failed to delete the note.");
    }
};
  return (
    <div>
        <Navbar/>
       <div class="container">
                <center><h1>DETAILED NOTES</h1></center><br></br>
                <div class="row">
                        <div className="col-lg-12 col-md-6 col-12 mb-3">
                            <div class="card">
                                <div class="card-body">
                                    <center><img src={data.image ? "http://localhost:3000/noteuploads/" + data.image : noteimage}  className="mx-auto" width="200px" height="200px" name="image"  alt="..."></img></center><br></br>
                                    <center><h2 class="card-title">{data.title}</h2>
                                    <h5>{data.subtitle}</h5></center>
                                    <p class="card-text">{data.description}</p>
                                    <p className="card-text">
                                        Posted by <strong>
                                           {data.user ? data.user?.username :"Admin"}
                                        </strong>
                                    </p>
                                </div>
                            </div>
                        </div>


                </div>
            </div>
            <br></br>
            <center>
             <Link class="btn btn-primary" to={`/admin-editnote/${data._id}`}  style={{marginLeft:"20px"}}>EDIT</Link>
             <button className="btn btn-primary mx-5" onClick={() => handleDelete(data._id)}>DELETE</button>
            <Link to="/admin-viewnote">
                <button type="button" className="btn btn-primary">BACK</button>
            </Link>
            </center>
    </div>
  )
}

export default ViewDetailednotes