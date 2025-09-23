import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import instance from '../../Utils/axios';
import noteimage from '../../Assets/defaultcopy.jpg'


function Validatenotes() {
    const [data, setDatas] = useState([]);
    const { id } = useParams()
    const token = localStorage.getItem("token")
    const validatenotes = async () => {
        instance.get(`/reject`)
            .then((res) => {
                setDatas(res.data);
                
                console.log("Notes fetched:", res.data);
            })
            .catch((err) => {
                console.log("Error fetching notes:", err);
            });
    }
    useEffect(()=>{
        validatenotes()
    },[])
    const approve = async (id) => {
        instance.put(`/approve/${id}`)
            .then((res) => {
                const filterData = data.filter((item) => {
                    return item._id != id
                })
                setDatas(filterData);
                console.log("Notes approved:", res.data);
            })
            .catch((err) => {
                console.log("Error", err);
            });
    }
    const reject=async(id)=>{
        await instance.delete(`/delete/reject/${id}`)
        .then((res) => {
                const filterData = data.filter((item) => {
                    return item._id != id
                })
                setDatas(filterData);
                console.log("Notes rejected:", res.data);
            })
            .catch((err) => {
                console.log("Error", err);
            });
    }
    return (
        <div>
            <Navbar />
            <br />
            <center><h1>VALIDATE NOTES</h1></center>
            <br />
            {data.length === 0 ? (
  <div className="text-center my-5">
    <h4>No Notes Available to Validate</h4>
  </div>
) : (
  data.map((e) => (
    <div className="col-lg-4 col-md-6 col-12 mb-3 mx-3" key={e._id}>
      <div className="card">
        <div className="card-body" style={{ height: "200px" }}>
          <center>
            <img
              src={e.image ? "http://localhost:3000/noteuploads/" + e.image : noteimage}
              className="mx-auto"
              width="70px"
              height="70px"
              alt="..."
            />
          </center>
          <h2 className="card-title">{e.title}</h2>
          <h5>{e.subtitle}</h5>
          <p className="card-text">{e.description}..</p>
          <p className="card-text">
            Posted by <strong>{e.user ? e.user.username : "Admin"}</strong>
          </p>
        </div>
        <div className="d-flex justify-content-center mb-3">
          <button type="button" className="bttn mx-2" onClick={() => approve(e._id)}>
            ACCEPT
          </button>
          <button type="button" className="bttn mx-2" onClick={() => reject(e._id)}>
            REJECT
          </button>
        </div>
      </div>
    </div>
  ))
)}

        </div>
    )
}

export default Validatenotes