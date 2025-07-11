import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import axios from 'axios'
import Navbar1 from './Navbar1'
import instance from '../../Utils/axios'
import { Link } from 'react-router-dom'

function Viewusers() {
  const [data, setData] = useState([])
  const [search, setSearchs] = useState([])
  useEffect(() => {
    const token = localStorage.getItem("token")
    instance.get(`/viewuser?username=${search}`)
      .then((res) => {
        setData(res.data)

      })
      .catch((err) => {
        alert("No result found")
        console.log(err)
      })
  }, [search])
  const handleDeletes = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete");
    if (!confirmDelete) return;
    try {
      const token = localStorage.getItem("token");
      await instance.delete(`/delete-user/${id}`);
      alert("User deleted successfully");
    }
    catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete the user.");
    }
  }
  return (
    <div>
      <Navbar1 setSearchs={setSearchs} />
      <br></br>
      <center>
        <table style={{
          width: '80%',
          margin: '20px auto',
          //borderCollapse:'collapse',
        }}>
          <thead>
            <tr style={{ border: " 1px solid" }}>
              <th style={{ border: " 1px solid", textAlign: "center" }}>Username</th>
              <th style={{ border: " 1px solid", textAlign: "center" }}>Phone No</th>
              <th style={{ border: " 1px solid", textAlign: "center" }}>Email</th>
              <th style={{ border: " 1px solid", textAlign: "center" }}>Delete user</th>

            </tr>
          </thead>
          <tbody>
            {data.map((e) => (
              <tr style={{ border: " 1px solid" }}>
                <td style={{ border: " 1px solid", textAlign: "center" }}>{e.username}</td>
                <td style={{ border: " 1px solid", textAlign: "center" }}>{e.phno}</td>
                <td style={{ border: " 1px solid", textAlign: "center" }}>{e.email}</td>
                <td style={{ border: " 1px solid", width: "40px", textAlign: "center" }}><button className="btn btn-primary mx-5" onClick={() => handleDeletes(e._id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <Link to="/admin-dashboard">
          <button type="button" className="bttns">BACK</button>
        </Link>
      </center>

    </div>
  )
}

export default Viewusers
