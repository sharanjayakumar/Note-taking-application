import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import axios from 'axios'
import pythonLogo from '../../Assets/python-logo.png';
import jslogo from '../../Assets/logo-javascript.png';
import htmllogo from '../../Assets/html.png';
import csslogo from '../../Assets/css.jpg';
import javalogo from '../../Assets/Java-Logo.png'
import clogo from '../../Assets/c.png'

function Viewnotes() {
    const [data,setData]=useState([])
    useEffect(() => {
        const token = localStorage.getItem("token"); 
        axios.get('http://localhost:3000/viewnote', {
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
    
    return (
        <div>
            <div class="container">
                <center><h1>NOTES</h1></center><br></br>
                <div class="row">
                    {data.map((e)=>(
                        <div className="col-lg-4 col-md-6 col-12 mb-3">
                        <div class="card">
                            <div class="card-body">
                                <h2 class="card-title">{e.title}</h2>
                                <h5>{e.subtitle}</h5>
                                <p class="card-text">{e.description}</p>
                                <a href="#" class="btn btn-primary">View more</a>
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