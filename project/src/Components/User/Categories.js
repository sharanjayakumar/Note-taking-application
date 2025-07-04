import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Nav from './Nav'
import instance from '../../Utils/axios'
import noteimage from '../../Assets/defaultcopy.jpg'
import ViewnoteNav from './ViewnoteNav'

function Categories({cat}) {
    const [datas,setDatas]=useState([])
     const [search,setSearch]=useState([])
    useEffect(()=>{
        const token=localStorage.getItem("token")
        instance.get(`/categoryuser/${cat}/?title=${search}`,{
            headers:{Authorization:`Bearer ${token}`}
        })
        .then((res)=>{
            setDatas(res.data)
        })
        .catch((err)=>{
            console.log(err)
        })
 },[cat,search])
  return (
    <div>
        <ViewnoteNav setSearch={setSearch}/>
        <div class="container">
                        <center><h1>NOTES</h1></center><br></br>
                        <div class="row">
                            {datas.length > 0 ? 
                            (datas.map((e) => (
                                <div className="col-lg-4 col-md-6 col-12 mb-3">
                                    <div class="card" style={{height: "500px"}}>
                                        <div class="card-body">
                                              <center><img src={e.image ? "http://localhost:3000/noteuploads/" + e.image : noteimage}  className="mx-auto" width="70px" height="70px" name="image"  alt="..."></img></center><br></br>
                                            <h2 class="card-title">{e.title}</h2>
                                            <h5>{e.subtitle}</h5>
                                            <p class="card-text">{e.description}..</p>
                                            <p className="card-text">
                                                Posted by <strong>
                                                   {e.user ? e.user?.username :"Admin"}
                                                </strong>
                                            </p>
                                            <Link class="btn btn-primary" to={`/userdetailednote/${e._id}`}>View more</Link>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ):(
                        <div><center><p>No result found</p></center></div>)
                    }
                        </div>
                    </div>
    </div>
  )
}

export default Categories