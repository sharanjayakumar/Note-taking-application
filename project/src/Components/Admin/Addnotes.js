import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import Navbar from "./Navbar";

function Addnotes() {
  const [data, setDatas] = useState({ title: "", subtitle: "", category: "", description: "" });

  const handleChange = (e) => {
    setDatas({ ...data, [e.target.name]: e.target.value });
  };

  const addnote = async () => {
    try {
      var token = localStorage.getItem("token");
          await axios.post('http://localhost:3000/addnote', {
          title: data.title,
          subtitle: data.subtitle,
          category: data.category,
          description: data.description
        },{headers:{Authorization:`Bearer ${token}`}});
        alert("Note added successfully");
    }
    catch(err){
      console.log("error", err);
      alert("Data not added");
    };
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", data);
    addnote();
  };

  return (
    <div>
      <Navbar/>
      <br />
      <center><h1>ADD NOTES</h1></center>
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
            <button type="submit" className="bttn">ADD</button>
            <Link to="/admin-dashboard">
              <button type="button" className="bttns">CANCEL</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Addnotes;
