import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Nav from './Nav'

function Viewnotes() {
    const [data, setData] = useState([])
    useEffect(() => {
        const token = localStorage.getItem("token");
        axios.get('http://localhost:3000/userviewnote', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
                setData(res.data);
                console.log("Notes fetched:", res.data);
            })
            .catch((err) => {
                console.log("Error fetching notes:", err);
            });
    }, []);
    const userdelete = async(id)=>{
        const confirm = window.confirm("Are you sure you want to delete this note?")
        if(! confirm)
        {return;}
        try{
            const token = localStorage.getItem("token");
            await axios.delete(`http://localhost:3000/userdeletenote/${id}`,{headers:{Authorization:`Bearer ${token}`}})
            alert("Note deleted successfully")
        }
        catch(err){
            console.log(err)
            alert("failed to delete note")
        }
    }
    return (
        <div>
            <Nav/>
            <div class="container">
                <center><h1>NOTES</h1></center><br></br>
                <div class="row">
                    {data.map((e) => (
                        <div className="col-lg-4 col-md-6 col-12 mb-3">
                            <div class="card">
                                <div class="card-body">
                                    <h2 class="card-title">{e.title}</h2>
                                    <h5>{e.subtitle}</h5>
                                    <p class="card-text">{e.description}</p>
                                    <a href="#" class="btn btn-primary">View more</a>
                                    <Link class="btn btn-primary" to={`/usereditnote/${e._id}`} style={{marginLeft:"20px"}}>EDIT</Link>
                                    <button onClick={()=>userdelete(e._id)} class="btn btn-primary" to='/usereditnote' style={{marginLeft:"20px"}}>DELETE</button>
                                </div>
                            </div>
                        </div>
                    ))}


                </div>
            </div>
        </div>
    )
}

export default Viewnotes