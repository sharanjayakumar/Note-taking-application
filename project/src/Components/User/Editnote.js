import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Nav from './Nav';
import { useNavigate } from 'react-router-dom';
import instance from '../../Utils/axios';
function Editnote() {
    const {id} = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState({ title: "", subtitle: "", category: "", description: "" })
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    useEffect(()=>{
        var token = localStorage.getItem("token")
        instance.get(`/userviewnote/${id}`)
                .then((res) => {
                    setData(res.data);
                    console.log("Notes fetched:", res.data);
                })
           
        },[])
       
    const editnote = async (id) => {
        try {
             var token = localStorage.getItem("token")
             const formData = new FormData()
            formData.append("title", data.title)
            formData.append("subtitle", data.subtitle)
            formData.append("category", data.category)
            formData.append("description", data.description)
            formData.append("image", data.image)
            await instance.put(`/user-editnote/${id}`,formData, {headers: { 'Content-Type': 'multipart/form-data' }});
             alert("Note updated successfully")
             navigate('/userviewnote')
        } 
         catch (err) {
            console.log("error", err);
            alert("Data not updated");
        }; 
    }
    const handleFile = (e) => {
        setData({ ...data, image: e.target.files[0] })

    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Edited")
        editnote(id);
    }
    return (
        <div>
            <Nav/>
            <br />
            <br/>
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
                            value={data.title}

                        />

                        <label htmlFor="subtitle">SUB TITLE (optional):</label>
                        <input
                            type="text"
                            id="subtitle"
                            placeholder="Enter subtitle"
                            name="subtitle"
                            onChange={handleChange}
                            value = {data.subtitle}
                        />

                        <label>CATEGORY:</label>
                        <div className="radio-group">
                            <div>
                                <input type="radio" id="c" value="C" name="category" onChange={handleChange} checked={data.category=="C"} />
                                <label htmlFor="c">C</label>
                            </div>
                            <div>
                                <input type="radio" id="java" value="JAVA" name="category" onChange={handleChange}checked={data.category=="JAVA"} />
                                <label htmlFor="java">JAVA</label>
                            </div>
                            <div>
                                <input type="radio" id="python" value="PYTHON" name="category" onChange={handleChange} checked={data.category=="PYTHON"}/>
                                <label htmlFor="python">PYTHON</label>
                            </div>
                            <div>
                                <input type="radio" id="html" value="HTML" name="category" onChange={handleChange} checked={data.category=="HTML"} />
                                <label htmlFor="html">HTML</label>
                            </div>
                            <div>
                                <input type="radio" id="css" value="CSS" name="category" onChange={handleChange} checked={data.category=="CSS"} />
                                <label htmlFor="css">CSS</label>
                            </div>
                            <div>
                                <input type="radio" id="js" value="JAVASCRIPT" name="category" onChange={handleChange} checked={data.category=="JAVASCRIPT"} />
                                <label htmlFor="js">JAVASCRIPT</label>
                            </div>
                        </div>

                        <label htmlFor="desc">DESCRIPTION:</label>
                        <textarea
                            id="desc"
                            name="description"
                            onChange={handleChange}
                            value={data.description}
                        ></textarea>
                         <label htmlFor="image">IMAGE:</label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        onChange={handleFile}
                    />
                        <div className="button-group">
                            <button type="submit" className="bttn">EDIT</button>
                            <Link to="/userviewnote">
                                <button type="button" className="bttns">CANCEL</button>
                            </Link>
                        </div>
                    </form>


            </div>
        </div>
    )
}


export default Editnote
