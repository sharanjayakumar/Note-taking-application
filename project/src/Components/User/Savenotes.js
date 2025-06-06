import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import ViewnoteNav from './ViewnoteNav';

function Savenotes() {
    const [data, setData] = useState([])
    useEffect(() => {
        const token = localStorage.getItem("token");
        axios.get('http://localhost:3000/savednotes', {
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
            <ViewnoteNav />
            <div class="container">
                <center><h1>SAVED NOTES</h1></center><br></br>
                <div class="row">
                    {data.map((e) => (
                        e.notes ? ( // ✅ check that e.notes is not null
                            <div className="col-lg-4 col-md-6 col-12 mb-3" key={e._id}>
                                <div className="card">
                                    <div className="card-body">
                                        <h2 className="card-title">{e.notes.title}</h2>
                                        <h5>{e.notes.subtitle}</h5>
                                        <p className="card-text">{e.notes.description}</p>
                                        <p className="card-text">
                                            Posted by <strong>{e.notes.user ? e.notes.user.username : "admin"}</strong>
                                        </p>
                                        <Link to={`/userdetailednote/${e._id}`} className="btn btn-primary">View more</Link>
                                    </div>
                                </div>
                            </div>
                        ) : null
                    ))}



                </div>
            </div>
        </div>
    )
}

export default Savenotes