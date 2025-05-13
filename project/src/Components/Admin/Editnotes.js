import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'

function Editnotes() {
    const [data, setData] = useState({ title: "", subtitle: "", category: "", description: "" })
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    const [datas, setDatas] = useState([])
    useEffect(()=>{
        var token = localStorage.getItem("token")
        axios.get("http://localhost:3000/viewnote", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((res) => {
                    setDatas(res.data);
                    console.log("Notes fetched:", res.data);
                })
           
        },[])
       
    const editnote = async () => {
        try {
             var token = localStorage.getItem("token")
            await axios.put("http://localhost:3000/editnote/",
                {
                headers: { Authorization: `Bearer ${token}` }
            });
             alert("Note updated successfully")
        } 
         catch (err) {
            console.log("error", err);
            alert("Data not updated");
        }; 
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Edited")
        editnote();
    }
    return (
        <div>
            <Navbar />
            <br />
            <br></br>
            <center><h1>EDIT NOTE</h1></center>
            <br />
            <div className="container">
                    <form onSubmit={handleSubmit} className="form1">
                        <label htmlFor="title">TITLE:</label>
                        <input
                            type="text"
                            id="title"
                            placeholder="Enter title"
                            name="title"
                            onChange={handleChange}
                        />

                        <label htmlFor="subtitle">SUB TITLE (optional):</label>
                        <input
                            type="text"
                            id="subtitle"
                            placeholder="Enter subtitle"
                            name="subtitle"
                            onChange={handleChange}
                        />

                        <label>CATEGORY:</label>
                        <div className="radio-group">
                            <div>
                                <input type="radio" id="c" value="C" name="category" onChange={handleChange} />
                                <label htmlFor="c">C</label>
                            </div>
                            <div>
                                <input type="radio" id="java" value="JAVA" name="category" onChange={handleChange} />
                                <label htmlFor="java">JAVA</label>
                            </div>
                            <div>
                                <input type="radio" id="python" value="PYTHON" name="category" onChange={handleChange} />
                                <label htmlFor="python">PYTHON</label>
                            </div>
                            <div>
                                <input type="radio" id="html" value="HTML" name="category" onChange={handleChange} />
                                <label htmlFor="html">HTML</label>
                            </div>
                            <div>
                                <input type="radio" id="css" value="CSS" name="category" onChange={handleChange} />
                                <label htmlFor="css">CSS</label>
                            </div>
                            <div>
                                <input type="radio" id="js" value="JAVASCRIPT" name="category" onChange={handleChange} />
                                <label htmlFor="js">JAVASCRIPT</label>
                            </div>
                        </div>

                        <label htmlFor="desc">DESCRIPTION:</label>
                        <textarea
                            id="desc"
                            name="description"
                            onChange={handleChange}
                        ></textarea>

                        <div className="button-group">
                            <button type="submit" className="bttn">EDIT</button>
                            <Link to="/admin-dashboard">
                                <button type="button" className="bttns">CANCEL</button>
                            </Link>
                        </div>
                    </form>


            </div>
        </div>
    )
}
}

export default Editnotes
