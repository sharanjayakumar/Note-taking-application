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
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to unsave this note?");
        if (!confirmDelete) return;
    
        try {
            const token = localStorage.getItem("token");
            await axios.delete(`http://localhost:3000/delete-savednote/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert("Note unsaved successfully");
            setData(prevData => prevData.filter(item => item._id !== id));
        } catch (err) {
            console.error("Delete failed:", err);
            alert("Failed to unsave the note.");
        }
    };
    return (
        <div>
            <ViewnoteNav />
            <div className="container">
                <center><h1>SAVED NOTES</h1></center><br />
                <div className="row">
                    {data.filter(e => e.notes).length > 0 ? (
                        data.map((e) => (
                            e.notes && (
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
                                            <button className="btn btn-primary" style={{marginLeft:"10px"}} onClick={() => handleDelete(e._id)}>Unsave</button>
                                        </div>
                                    </div>
                                </div>
                            )
                        ))
                    ) : (
                        <div><center><p>No saved notes found</p></center></div>
                    )}
                </div>
            </div>


        </div>
    )
}

export default Savenotes