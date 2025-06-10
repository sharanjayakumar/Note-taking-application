import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Navbar from './Navbar';
import instance from '../../Utils/axios';

function Editnotes() {
    const [data, setData] = useState({ title: "", subtitle: "", category: "", description: "" });
    const { id } = useParams();
    const navigate=useNavigate();

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        instance.get(`/viewnote/${id}`)
        .then((res) => {
            setData(res.data);
            console.log("Notes fetched:", res.data);
        });
    }, [id]);

    const editnote = async (id) => {
        try {
            const token = localStorage.getItem("token");
            await instance.put(`/editnote/${id}`, data);
            alert("Note updated successfully");
            navigate('/admin-viewnote')
        } catch (err) {
            console.log("error", err);
            alert("Data not updated");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Edited");
        editnote(id);
    };
    return (
        <div>
            <Navbar />
            <br />
            <center><h1>EDIT NOTE</h1></center>
            <br />
            <div className="container">
                <form onSubmit={handleSubmit} className="form1">
                    <label htmlFor="title">TITLE:</label>
                    <input type="text" id="title" name="title" value={data.title} onChange={handleChange} />

                    <label htmlFor="subtitle">SUB TITLE (optional):</label>
                    <input type="text" id="subtitle" name="subtitle" value={data.subtitle} onChange={handleChange} />

                     <label>CATEGORY:</label>
                        <div className="radio-group">
                            <div>
                                <input type="radio" id="c" value="C" name="category" onChange={handleChange} checked={data.category === "C"} />
                                <label htmlFor="c">C</label>
                            </div>
                            <div>
                                <input type="radio" id="java" value="JAVA" name="category" onChange={handleChange} checked={data.category === "JAVA"}/>
                                <label htmlFor="java">JAVA</label>
                            </div>
                            <div>
                                <input type="radio" id="python" value="PYTHON" name="category" onChange={handleChange} checked={data.category === "PYTHON"}/>
                                <label htmlFor="python">PYTHON</label>
                            </div>
                            <div>
                                <input type="radio" id="html" value="HTML" name="category" onChange={handleChange} checked={data.category === "HTML"} />
                                <label htmlFor="html">HTML</label>
                            </div>
                            <div>
                                <input type="radio" id="css" value="CSS" name="category" onChange={handleChange} checked={data.category === "CSS"} />
                                <label htmlFor="css">CSS</label>
                            </div>
                            <div>
                                <input type="radio" id="js" value="JAVASCRIPT" name="category" onChange={handleChange} checked={data.category === "JAVASCRIPT"}/>
                                <label htmlFor="js">JAVASCRIPT</label>
                            </div>
                        </div>

                    <label htmlFor="desc">DESCRIPTION:</label>
                    <textarea id="desc" name="description" value={data.description} onChange={handleChange} />

                    <div className="button-group">
                        <button type="submit" className="bttn">EDIT</button>
                        <Link to="/admin-dashboard">
                            <button type="button" className="bttns">CANCEL</button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Editnotes;
