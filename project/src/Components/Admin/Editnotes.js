import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Navbar from './Navbar'

function Editnotes() {
    const {id}=useParams()
    console.log(id)
    const [data, setData] = useState({ title: "", subtitle: "", category: "", description: "" })
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    const [datas, setDatas] = useState([])
    useEffect(()=>{
        var token = localStorage.getItem("token")
        axios.get("http://localhost:3000/viewnote/"+id, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((res) => {
                    setDatas(res.data);
                    console.log("Notes fetched:", res.data);
                })
           
        },[])
       
    const editnote = async (id) => {
        try {
             var token = localStorage.getItem("token")
            await axios.put("http://localhost:3000/editnote",
                {
                headers: { Authorization: `Bearer ${token}` }
            });
             alert("Note updated successfully")
        } 
         catch (err) {
            console.log("error", err);
            alert("Data not updated");
        }; 
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Edited")
        editnote(id);
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
                            value={datas.title}
                        />

                        <label htmlFor="subtitle">SUB TITLE (optional):</label>
                        <input
                            type="text"
                            id="subtitle"
                            placeholder="Enter subtitle"
                            name="subtitle"
                            onChange={handleChange}
                            value={datas.subtitle}
                        />

                        <label>CATEGORY:</label>
                        <div className="radio-group">
                            <div>
                                <input type="radio" id="c" value="C" name="category" onChange={handleChange} checked={datas.category=="C"}/>
                                <label htmlFor="c">C</label>
                            </div>
                            <div>
                                <input type="radio" id="java" value="JAVA" name="category" onChange={handleChange} checked={datas.category=="JAVA"}/>
                                <label htmlFor="java">JAVA</label>
                            </div>
                            <div>
                                <input type="radio" id="python" value="PYTHON" name="category" onChange={handleChange} checked={datas.category=="PYTHON"}/>
                                <label htmlFor="python">PYTHON</label>
                            </div>
                            <div>
                                <input type="radio" id="html" value="HTML" name="category" onChange={handleChange} checked={datas.category=="HTML"} />
                                <label htmlFor="html">HTML</label>
                            </div>
                            <div>
                                <input type="radio" id="css" value="CSS" name="category" onChange={handleChange} checked={datas.category=="CSS"}/>
                                <label htmlFor="css">CSS</label>
                            </div>
                            <div>
                                <input type="radio" id="js" value="JAVASCRIPT" name="category" onChange={handleChange}checked={datas.category=="JAVASCRIPT"} />
                                <label htmlFor="js">JAVASCRIPT</label>
                            </div>
                        </div>

                        <label htmlFor="desc">DESCRIPTION:</label>
                        <textarea
                            id="desc"
                            name="description"
                            onChange={handleChange}
                            value={datas.description}
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


export default Editnotes
