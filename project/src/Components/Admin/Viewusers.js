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
        //borderCollapse:'collapse',
        }}>
        <thead>
          <tr style={{border:" 1px solid"}}>
            <th style={{border:" 1px solid"}}>Username</th>
            <th style={{border:" 1px solid"}}>Phone No</th>
            <th style={{border:" 1px solid"}}>Email</th>
          </tr>
        </thead>
        <tbody>
          {data.map((e) => (
            <tr style={{border:" 1px solid"}}>
              <td style={{border:" 1px solid"}}>{e.username}</td>
              <td style={{border:" 1px solid"}}>{e.phno}</td>
              <td style={{border:" 1px solid"}}>{e.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </center>
    </div>
  )
}

export default Viewusers
