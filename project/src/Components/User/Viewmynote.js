import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import axios from 'axios'
import { Link } from 'react-router-dom'
import ViewnoteNav from './ViewnoteNav'
import instance from '../../Utils/axios'

function Viewmynotes() {
    const [data, setData] = useState([])
    useEffect(() => {
        instance.get('/userviewmynote')
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
            <ViewnoteNav/>
            <div class="container">
                <center><h1>NOTES</h1></center><br></br>
                <div class="row">
                    {data.map((e) => (
                        <div className="col-lg-4 col-md-6 col-12 mb-3">
                            <div class="card">
                                <div class="card-body" style={{height: "350px"}}>
                                    <h2 class="card-title">{e.title}</h2>
                                    <h5>{e.subtitle}</h5>
                                    <p class="card-text">{e.description}</p>
                                    <p className='card-text'>
                                        Posted by <strong>{e.user? e.user?.username:"admin"}</strong>
                                    </p>
                                    <Link to={`/userdetailednote/${e._id}`} class="btn btn-primary">View more</Link>
                                </div>
                            </div>
                        </div>
                    ))}


                </div>
            </div>
        </div>
    )
}

export default Viewmynotes