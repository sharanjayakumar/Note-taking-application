import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import axios from 'axios'

function Viewusers() {
  const [data, setData] = useState([])

  useEffect(() => {
    const token = localStorage.getItem("token")
    axios.get('http://localhost:3000/viewuser', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => {
        setData(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <div>
      <Navbar />
      <br></br>
      <center>
      <table  style={{
        width: '80%',
        margin: '20px auto',
        borderCollapse:'collapse',
        }}>
        <thead>
          <tr>
            <th>Username</th>
            <th >Phone No</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {data.map((e) => (
            <tr>
              <td>{e.username}</td>
              <td>{e.phno}</td>
              <td>{e.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </center>
    </div>
  )
}

export default Viewusers
