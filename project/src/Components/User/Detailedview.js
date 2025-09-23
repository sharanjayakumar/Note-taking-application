import React from 'react'
import axios from 'axios'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Nav from './Nav'
import instance from '../../Utils/axios'
import noteimage from '../../Assets/defaultcopy.jpg'
function Detailedview() {
    const navigate = useNavigate()
    const { id } = useParams()
    const [data, setData] = useState([])
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const payload = JSON.parse(atob(token.split('.')[1]));
            console.log("Decoded token payload:", payload);
            setCurrentUser(payload.id);
        }
    }, []);

    useEffect(() => {
        const token = localStorage.getItem("token");
        instance.get(`/userviewnote/${id}`)
            .then((res) => {
                setData(res.data);
                console.log("Notes fetched:", res.data);
                console.log("Note owner (data.user):", res.data.user);
            })
            .catch((err) => {
                console.log("Error fetching notes:", err);
            });
    }, []);
    const userdelete = async (id) => {
        const confirm = window.confirm("Are you sure you want to delete this note?")
        if (!confirm) { return; }
        try {
            const token = localStorage.getItem("token");
            await instance.delete(`/userdeletenote/${id}`)
            alert("Note deleted successfully")
        }
        catch (err) {
            console.log(err)
            alert("failed to delete note")
        }
    }
    const savednote = async (id) => {
        try {
            const token = localStorage.getItem("token");
            await instance.post(`/savenote/${id}`, {})
            alert("Note saved successfully")
        }
        catch (err) {
            console.log(err)
            alert("failed to save note")
        }

    }
    return (
        <div>
            <Nav />
            <div className='container'>
                <center><h1>DETAILED NOTE</h1></center><br></br>
                <div class="row">
                    <div className="col-lg-12 col-md-6 col-12 mb-3">
                        <div class="card">
                            <div class="card-body">
                                <center><img src={data.image ? "http://localhost:3000/noteuploads/" + data.image : noteimage} className="mx-auto" width="200px" height="200px" name="image" alt="..."></img></center>
                                <center><h2 class="card-title">{data.title}</h2>
                                    <h5>{data.subtitle}</h5></center>
                                <center><p class="card-text"><b>Category: </b> {data.category}</p>
                                    <p class="card-text">{data.description}</p></center>

                            </div>
                        </div>
                    </div>


                </div>
            </div>
            <br></br>
            <center>
                {currentUser === data.user ? (
                    // Owner sees all 4 buttons
                    <>
                        <Link className="btn btn-primary mx-2" to={`/usereditnote/${data._id}`}>
                            EDIT
                        </Link>
                        <button
                            onClick={() => userdelete(data._id)}
                            className="btn btn-danger mx-2"
                        >
                            DELETE
                        </button>
                        <button
                            className="btn btn-success mx-2"
                            onClick={() => savednote(data._id)}
                        >
                            SAVE
                        </button>
                        <button
                            onClick={() => navigate(-1)}
                            className="btn btn-secondary mx-2"
                        >
                            BACK
                        </button>
                    </>
                ) : (
                    // Other users see only SAVE and BACK
                    <>
                        <button
                            className="btn btn-success mx-2"
                            onClick={() => savednote(data._id)}
                        >
                            SAVE
                        </button>
                        <button
                            onClick={() => navigate(-1)}
                            className="btn btn-secondary mx-2"
                        >
                            BACK
                        </button>
                    </>
                )}
            </center>

            <br></br>
        </div>
    )
}

export default Detailedview