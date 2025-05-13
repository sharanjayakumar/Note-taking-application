import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from './Navbar';

function Editnotes() {
    const [data, setData] = useState({ title: "", subtitle: "", category: "", description: "" });
    const { id } = useParams();

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        axios.get(`http://localhost:3000/viewnote/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then((res) => {
            setData(res.data);
            console.log("Notes fetched:", res.data);
        });
    }, [id]);

    const editnote = async (id) => {
        try {
            const token = localStorage.getItem("token");
            await axios.put(`http://localhost:3000/editnote/${id}`, data, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert("Note updated successfully");
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
                        {["C", "JAVA", "PYTHON", "HTML", "CSS", "JAVASCRIPT"].map(cat => (
                            <div key={cat}>
                                <input type="radio" id={cat} value={cat} name="category"
                                    checked={data.category === cat}
                                    onChange={handleChange} />
                                <label htmlFor={cat}>{cat}</label>
                            </div>
                        ))}
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
