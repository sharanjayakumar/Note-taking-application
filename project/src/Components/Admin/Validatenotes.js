import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

function Validatenotes() {
    const [data, setDatas] = useState([]);
    const { id } = useParams()
    const token = localStorage.getItem("token")
    const validatenotes = async () => {
        axios.get(`http://localhost:3000/reject`, { headers: { Authorization: `Bearer ${token}` } })
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
        axios.put(`http://localhost:3000/approve/${id}`, { headers: { Authorization: `Bearer ${token}` } })
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
        await axios.delete(`http://localhost:3000/delete/reject/${id}`,{headers:{Authorization:`Bearer ${token}`}})
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
            {data.map((e) => (
                <div className="col-lg-4 col-md-6 col-12 mb-3 mx-5">
                    <div class="card">
                        <div class="card-body">
                            <h2 class="card-title">{e.title}</h2>
                            <h5>{e.subtitle}</h5>
                            <p class="card-text">{e.description}..</p>
                            <p className="card-text">
                                Posted by <strong>
                                    {e.user ? e.user?.username : "Admin"}
                                </strong>
                            </p>
                        </div>

                        <br></br>
                        <div className="button-group">
                            <button type="submit" className="bttn mx-3" onClick={() => approve(e._id)}>ACCEPT</button>
                            <button type="submit" className="bttn" onClick={() => reject(e._id)} >REJECT</button>
                        </div>
                        <br></br>
                    </div>
                </div>

            ))}
        </div>
    )
}

export default Validatenotes