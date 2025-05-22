import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../Admin/Navbar'

function Category({cat}) {
    const [datas,setDatas]=useState([])
    useEffect(()=>{
        const token=localStorage.getItem("token")
        axios.get(`http://localhost:3000/category/${cat}`,{
            headers:{Authorization:`Bearer ${token}`}
        })
        .then((res)=>{
            setDatas(res.data)
        })
        .catch((err)=>{
            console.log(err)
        })
 },[cat])
  return (
    <div>
        <Navbar/>
        <div class="container">
                        <center><h1>NOTES</h1></center><br></br>
                        <div class="row">
                            {datas.map((e) => (
                                <div className="col-lg-4 col-md-6 col-12 mb-3">
                                    <div class="card">
                                        <div class="card-body">
                                            <h2 class="card-title">{e.title}</h2>
                                            <h5>{e.subtitle}</h5>
                                            <p class="card-text">{e.description}..</p>
                                            <p className="card-text">
                                                Posted by <strong>
                                                   {e.user ? e.user?.username :"Admin"}
                                                </strong>
                                            </p>
                                            <Link class="btn btn-primary" to={`/admin-viewdetailnotes/${e._id}`}>View more</Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
        
                        </div>
                    </div>
    </div>
  )
}

export default Category